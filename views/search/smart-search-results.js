'use strict'

import React, {Component} from 'react'
import SearchResults from "./search-results"
import DoSearch from "../../domain/do-search.use-case"
import * as _ from "lodash"

export default class SmartSearchResults extends Component {
    constructor(props) {
        super()

        this.page = 1
        this.searchQuery = props.searchQuery

        this.searchCommand = new DoSearch(this.page, this.searchQuery)
        this.fetchDepleted = false

        this.fetchingData = false

        this.state = {
            repositories: [],
            loading: true
        }
    }

    componentDidMount() {
        this.bindResults()
            .catch(err => console.warn(err))
            .finally(() => this.setState({loading: false}))
    }

    componentDidUpdate() {
        this.fetchingData = false
    }

    async bindResults() {
        this.fetchingData = true
        let repositories = await this.searchCommand.execute()

        repositories = _.uniqBy([...this.state.repositories, ...repositories.items], 'id')

        this.fetchDepleted = false
        this.setState({
            repositories: repositories
        })
    }

    hasRepository(r1, r2) {
        return r1.id === r2.id
    }

    isLoading() {
        return this.state.loading
    }

    isFetchDepleted() {
        return this.fetchDepleted
    }

    endReachedHandler() {
        if (this.fetchingData) {
            return
        }

        this.page++
        this.searchCommand = new DoSearch(this.page, this.searchQuery)

        this.bindResults()
            .catch(err => {
                err.then(result => console.log(result.message))
                this.page--
                if (this.fetchDepleted === false) {
                    this.fetchDepleted = true
                    this.forceUpdate()
                }
            })
    }

    render() {
        return (
            <SearchResults
                isLoading={this.isLoading.bind(this)}
                repositories={this.state.repositories}
                endReachedEvent={this.endReachedHandler.bind(this)}
                hideFooter={this.isFetchDepleted.bind(this)}
            />
        )
    }
}