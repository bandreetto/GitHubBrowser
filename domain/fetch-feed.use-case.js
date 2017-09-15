'use strict'

import Toolbox from '../toolbox'

export default class FetchFeed {
    constructor(pageNumber) {
        this.state = {
            page: pageNumber
        }
    }

    execute() {
        return Toolbox.getAuth()
            .then((authInfo) => {
                const url = 'https://api.github.com/users/'
                    + authInfo.user.login
                    + '/received_events?page=' + this.state.page + '&per_page=100'

                return fetch(url, {
                    headers: {
                        Authorization: 'Basic ' + authInfo.auth
                    }
                })
            })
            .then(response => {
                if (response.ok) {
                    return response
                }

                throw response.json()
            })
            .then(response => {
                console.log(response)
                return response.json()
            })
    }
}
