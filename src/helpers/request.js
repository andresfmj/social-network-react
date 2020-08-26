import { TOKEN_AUTH, API_URL } from './constants';

const request = async (uri, method, params) => {
    let appId = TOKEN_AUTH
    if (localStorage.getItem('token_appId')) {
        let token = JSON.parse(localStorage.getItem('token_appId'))
        appId = token.appId
    }
    const req = await fetch(`${API_URL}${uri}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'app-id': `${appId}`
        },
        mode: 'cors',
        body: params ? JSON.stringify(params) : null
    })
    return req
}

export {
    request
}
