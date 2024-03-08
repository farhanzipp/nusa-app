import { hostUrl } from "./host_url";

export async function getDatasiswa() {
    return fetch(`https://${hostUrl}/nusa-api/students/totals`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
    })
        .then(response => response.json());
}