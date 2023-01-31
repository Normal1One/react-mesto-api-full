class Api {
    constructor(options) {
        this._options = options
    }

    getProfileInfo() {
        return this._request(`users/me`, {
            method: 'GET',
        })
    }

    changeProfilePhoto(link) {
        return this._request(`users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({
                avatar: link,
            }),
        })
    }

    changeProfileInfo(name, about) {
        return this._request(`users/me`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
    }

    createCard(name, link) {
        return this._request(`cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
    }

    deleteCard(id) {
        return this._request(`cards/${id}`, {
            method: 'DELETE',
        })
    }

    changeLikeCardStatus(id, isLiked) {
        return this._request(`cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
        })
    }

    getInitialCards() {
        return this._request(`cards`, {
            method: 'GET',
        })
    }

    async _request(url, options) {
        options['headers'] = this._options.headers
        options['credentials'] = this._options.credentials
        const response = await fetch(`${this._options.baseUrl}/${url}`, options)
        return this._checkResponse(response)
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`Ошибка: ${response.status}`)
    }
}

const api = new Api({
    baseUrl: 'https://api.mesto.nikitalavrov.nomoredomainsclub.ru',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
})

export default api
