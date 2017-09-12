'use strict';

import React, {Component} from 'react'
import {ListView} from 'react-native'
import Feed from './feed'
import FetchFeed from '../../domain/fetch-feed.usecase.js'

export default class SmartFeed extends Component {
    componentWillMount() {
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        const fetchCommand = new FetchFeed()

        this.setState({
            fetchFeed: fetchCommand,
            dataSource: dataSource,
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
            dataSource: this.state.dataSource.cloneWithRows(feedItems),
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
        console.log(rowData)
    }

    render() {
        return (
            <Feed
                dataSource={this.listDataSource.bind(this)}
                isLoading={this.isLoading.bind(this)}
                rowPressEvent={this.rowPressHandler.bind(this)}/>)
    }
}
