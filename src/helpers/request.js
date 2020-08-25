import { TOKEN_AUTH, API_URL } from './constants';

const request = async (uri, method, params) => {
    const req = await fetch(`${API_URL}${uri}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'app-id': `${TOKEN_AUTH}`
        },
        mode: 'cors',
        body: params ? JSON.stringify(params) : null
    })
    return req
}

export {
    request
}
