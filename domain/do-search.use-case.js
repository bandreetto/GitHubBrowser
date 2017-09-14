'use strict'

import Toolbox from '../toolbox'

export default class DoSearch {
    constructor(searchQuery) {
        this.state = {
            searchQuery: searchQuery
        }
    }

    execute() {
        const url = 'https://api.github.com/search/repositories?q=' +
            encodeURIComponent(this.state.searchQuery)

        return fetch(url)
            .then(response => response.json())
    }
}
