'use strict';

import React, {Component} from 'react'
import {FlatList, ListView} from 'react-native'
import Feed from './feed'
import FetchFeed from '../../domain/fetch-feed.usecase.js'
import Details from "./feed-details";

export default class SmartFeed extends Component {
    componentWillMount() {
        const fetchCommand = new FetchFeed()

        this.setState({
            fetchFeed: fetchCommand,
            showProgress: true
        })
    }

    componentDidMount() {
        this.state.fetchFeed.execute().then(data => this.bindFeed(data))
    }

    bindFeed(responseData) {
        const feedItems = responseData.filter(evnt => evnt.type === 'PushEvent')

        console.log(feedItems)

        this.setState({
            dataSource: feedItems,
            showProgress: false
        })
    }

    listDataSource() {
        return this.state.dataSource
    }

    isLoading() {
        return this.state.showProgress
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

    render() {
        return (
            <Feed
                dataSource={this.listDataSource.bind(this)}
                isLoading={this.isLoading.bind(this)}
                rowPressEvent={this.rowPressHandler.bind(this)}/>)
    }
}
