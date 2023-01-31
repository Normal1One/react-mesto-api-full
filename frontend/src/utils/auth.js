export const BASE_URL = 'https://api.mesto.nikitalavrov.nomoredomainsclub.ru'

export const register = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    return _checkResponse(response)
}

export const authorize = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password, email }),
    })
    return _checkResponse(response)
}

export const checkToken = async () => {
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
    })
    return _checkResponse(response)
}

export const logout = async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
    })
    return _checkResponse(response)
}

function _checkResponse(response) {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`)
}
