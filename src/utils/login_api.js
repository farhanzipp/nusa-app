import {hostUrl} from "./host_url";

export async function loginUser(credentials) {
    return fetch(`http://${hostUrl}/nusa-api/users/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(response => response.json());
}
