'use strict'

import React, {Component} from 'react'
import Feed from './feed'
import FetchFeed from '../../domain/fetch-feed.use-case.js'
import Details from "./feed-details"

export default class SmartFeed extends Component {
    constructor() {
        super()

        const fetchCommand = new FetchFeed(1)

        this.page = 1
        this.fetchFeed = fetchCommand

        this.state = {
            loading: true,
            dataSource: [],
        }
    }


    componentDidMount() {
        this.bindFeed()
            .catch(err => console.warn(err))
            .finally(() => this.setState({loading: false}))
    }

    async bindFeed() {
        let feedItems = await this.fetchFeed.execute()

        this.fetchDepleted = false
        feedItems = feedItems.filter(evnt => evnt.type === 'PushEvent')
        console.log(feedItems)

        this.setState({
            dataSource: [...this.state.dataSource, ...feedItems],
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

    render() {
        return (
            <Feed
                dataSource={this.state.dataSource}
                isLoading={this.state.loading}
                rowPressEvent={this.rowPressHandler}
                endReachedEvent={this.endReachedHandler}
                hideFooter={this.fetchDepleted}
            />)
    }
}
