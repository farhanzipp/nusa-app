export async function loginUser(credentials) {
    return fetch('http://localhost:8080/nusa-api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(response => response.json());
}