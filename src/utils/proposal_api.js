import { hostUrl } from "./host_url";

export async function getAllProposals() {
  try {
    const response = await fetch(`https://${hostUrl}/nusa-api/proposals`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., server errors)
      throw new Error('Failed to fetch proposals');
    }

    const data = await response.json();

    // Check if the response is empty
    if (data.length === 0) {
      // Handle empty response (e.g., return a default value or throw an error)
      throw new Error('No proposals found');
    }

    return data;
  } catch (error) {
    // Handle errors (e.g., log the error or return a default value)
    console.error('Error fetching proposals:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}


export async function postProposal(proposalData) {
  return fetch(`https://${hostUrl}/nusa-api/proposals`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(proposalData)
  })
    .then(response => response.json());
}

export async function postProposalFile(proposalFile) {
  const formData = new FormData();
  formData.append('file', proposalFile);

  return fetch(`https://${hostUrl}/nusa-api/upload/proposals`, {
    method: 'POST',
    mode: 'cors',
    body: formData
  })
    .then(response => response.json());
}

export async function getProposalDetail(proposalId) {
  return fetch(`https://${hostUrl}/nusa-api/proposals?id=${proposalId}`, {
    method: 'GET',
  })
    .then(response => response.json());
}

export async function getProposalFile(pdfTitle) {
  return fetch(`https://${hostUrl}/nusa-api/upload/proposals/${pdfTitle}`, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);

      // Set the download attribute to specify the filename
      downloadLink.setAttribute('download', pdfTitle);

      // Append the anchor element to the body
      document.body.appendChild(downloadLink);

      // Click the link to start the download
      downloadLink.click();

      // Cleanup: Remove the temporary anchor element
      document.body.removeChild(downloadLink);
    })
}
