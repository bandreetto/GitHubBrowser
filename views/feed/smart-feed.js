'use strict'

import React, {Component} from 'react'
import Feed from './feed'
import FetchFeed from '../../domain/fetch-feed.use-case.js'
import Details from "./feed-details"
import * as _ from "lodash"

export default class SmartFeed extends Component {
    constructor() {
        super()

        const fetchCommand = new FetchFeed(1)

        this.page = 1
        this.fetchFeed = fetchCommand

        this.state = {
            loading: true,
            dataSource: [],
            refreshing: false
        }
    }


    componentDidMount() {
        this.bindFeed()
            .catch(err => console.warn(err))
            .finally(() => this.setState({
                loading: false,
                refreshing: false
            }))
    }

    async bindFeed() {
        let feedItems = await this.fetchFeed.execute()

        this.fetchDepleted = false
        feedItems = feedItems.filter(evnt => evnt.type === 'PushEvent')
        console.log(feedItems)

        feedItems = _.uniqBy([...this.state.dataSource, ...feedItems], 'id')

        this.setState({
            dataSource: feedItems,
        })
    }

    rowPressHandler = (rowData) => {
        this.props.navigator.push({
            title: 'Push Event',
            component: Details,
            passProps: {
                pushEvent: rowData.item
            }
        })
    }

    endReachedHandler = () => {
        this.page++
        this.fetchFeed = new FetchFeed(this.page)

        this.bindFeed()
            .catch(err => {
                err.then(result => console.log(result.message))
                this.page--
                if (this.fetchDepleted === false) {
                    this.fetchDepleted = true
                    this.forceUpdate()
                }
            })
    }

    refreshHandler = () => {
        this.page = 0
        this.fetchFeed = new FetchFeed(this.page)

        this.setState({refreshing: true})

        this.bindFeed()
            .catch(err => console.warn(err))
            .finally(() => this.setState({
                refreshing: false,
                fetchDepleted: true
            }))
    }

    render() {
        return (
            <Feed
                dataSource={this.state.dataSource}
                isLoading={this.state.loading}
                rowPressEvent={this.rowPressHandler}
                endReachedEvent={this.endReachedHandler}
                hideFooter={this.fetchDepleted}
                isRefreshing={this.state.refreshing}
                refreshEvent={this.refreshHandler}
            />)
    }
}
