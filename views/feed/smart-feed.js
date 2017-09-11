'use strict';

import React, { Component } from 'react'
import { ListView } from 'react-native'
import Feed from './feed'
// import FetchFeed from '../../domain/fetch-feed.usecase.js'

export default class SmartFeed extends Component {
  componentWillMount() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.setState({
      dataSource: dataSource.cloneWithRows(['A', 'B', 'C'])
    })
  }

  listDataSource() {
    return this.state.dataSource
  }

  render() {
    return (
      <Feed
        dataSource={this.listDataSource.bind(this)} />)
  }
}
