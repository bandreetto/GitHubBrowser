'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  StyleSheet } from 'react-native'

export default class Feed extends Component {

  renderRow(rowData) {
    return (
    <Text style={styles.row}>
      {rowData}
    </Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.props.dataSource()}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  row: {
    color: '#333',
    backgroundColor: '#fff'
  }
});
