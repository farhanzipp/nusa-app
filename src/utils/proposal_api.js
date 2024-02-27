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
