export async function getAllProposals() {
    return fetch('https://jibas.tasnusa.online/nusa-api/proposals', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json());
}

export async function postProposal(proposalData) {
  return fetch('https://jibas.tasnusa.online/nusa-api/proposals', {
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
  return fetch('https://jibas.tasnusa.online/nusa-api/upload/proposals', {
    method: 'POST',
    mode: 'cors',
    body: proposalFile
  })
  .then(response => response.json());
}
