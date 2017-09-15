'use strict'

import React, {Component} from 'react'
import Feed from './feed'
import FetchFeed from '../../domain/fetch-feed.use-case.js'
import Details from "./feed-details"

export default class SmartFeed extends Component {
    componentWillMount() {
        const fetchCommand = new FetchFeed(1)

        this.page = 1
        this.fetchFeed = fetchCommand

        this.setState({
            loading: true,
            dataSource: []
        })
    }


    componentDidMount() {
        this.bindFeed()
            .catch(err => console.warn(err))
            .finally(() => this.setState({loading: false}))
    }

    async bindFeed() {
        let feedItems = await this.fetchFeed.execute()

        feedItems = feedItems.filter(evnt => evnt.type === 'PushEvent')
        console.log(feedItems)

        this.setState({
            dataSource: [...this.state.dataSource, ...feedItems],
        })
    }

    listDataSource() {
        return this.state.dataSource
    }

    isLoading() {
        return this.state.loading
    }

    rowPressHandler(rowData) {
        this.props.navigator.push({
            title: 'Push Event',
            component: Details,
            passProps: {
                pushEvent: rowData
            }
        })
    }

    endReachedHandler() {
        this.page++
        this.fetchFeed = new FetchFeed(this.page)

        this.bindFeed()
            .catch(err => {
                err.then(result => console.log(result.message))
                this.page--
            })
    }

    render() {
        return (
            <Feed
                dataSource={this.listDataSource.bind(this)}
                isLoading={this.isLoading.bind(this)}
                rowPressEvent={this.rowPressHandler.bind(this)}
                endReachedEvent={this.endReachedHandler.bind(this)}/>)
    }
}
