export async function loginUser(credentials) {
    return fetch('https://jibas.tasnusa.online/nusa-api/users/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(response => response.json());
}