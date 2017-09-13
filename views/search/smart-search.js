'use strict'

import React, {Component} from 'react'
import Search from "./search"

export default class SmartSearch extends Component {
    constructor() {
        super()

        this.state = {
            queryInput: ''
        }
    }


    setQueryInput(text) {
        this.setState({queryInput: text})
    }

    searchHandler() {
        console.log('Attempting to search for: ' + this.state.queryInput)
    }

    render() {
        return <Search
                    setQueryInput={this.setQueryInput.bind(this)}
                    searchEvent={this.searchHandler.bind(this)}/>
    }
}
