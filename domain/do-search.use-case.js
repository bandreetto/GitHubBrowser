'use strict'

export default class DoSearch {
    constructor(page, searchQuery) {
        this.page = page
        this.searchQuery = searchQuery
    }

    execute() {
        const url = 'https://api.github.com/search/repositories?q=' +
            encodeURIComponent(this.searchQuery) +
            '&page=' + this.page

        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response
                }

                throw response.json()
            })
            .then(response => {
                console.log(response)
                const a = response.json()
                    .then(r => {
                        console.log(r)
                        return r
                    })
                return a
            })
    }
}
