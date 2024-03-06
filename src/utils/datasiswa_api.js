export async function getDatasiswa() {
    return fetch('http://10.10.10.9/nusa-api/students/totals', {
        method: 'GET',
        mode: 'cors',
    })
        .then(response => response.json());
}