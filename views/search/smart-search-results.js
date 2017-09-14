'use strict'

import React, {Component} from 'react'
import SearchResults from "./search-results"
import DoSearch from "../../domain/do-search.use-case"

export default class SmartSearchResults extends Component {
    componentWillMount() {
        const searchCommand = new DoSearch(this.props.searchQuery)

        this.setState({
            searchCommand: searchCommand,
            loading: true
        })
    }

    componentDidMount() {
        this.doSearch()
    }

    doSearch() {
        this.state.searchCommand.execute()
            .then(results => {
                console.log(results)

                this.setState({
                    repositories: results.items
                })
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    getRepositories() {
        return this.state.repositories
    }

    isLoading() {
        return this.state.loading
    }

    render() {
        return (
            <SearchResults
                isLoading={this.isLoading.bind(this)}
                repositories={this.getRepositories.bind(this)}/>
        )
    }

}