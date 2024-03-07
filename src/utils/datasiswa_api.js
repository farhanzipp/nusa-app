import { hostUrl } from "./host_url";

export async function getDatasiswa() {
    return fetch(`https://${hostUrl}/nusa-api/students/totals`, {
        method: 'GET',
        mode: 'cors',
    })
        .then(response => response.json());
}