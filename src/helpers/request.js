import { TOKEN_AUTH } from './constants';

const request = async (api, method, params) => {
    const req = await fetch(api, {
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
