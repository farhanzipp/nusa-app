import { hostUrl } from "./host_url";

export async function getTotalSiswa() {
    return fetch(`https://${hostUrl}/nusa-api/students/totals`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
    })
        .then(response => response.json());
}

export async function getAllSiswa(page, rows) {
    return fetch(`https://${hostUrl}/nusa-api/students/profiles?page=${page}&limit=${rows}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
    })
        .then(response => response.json());
}
