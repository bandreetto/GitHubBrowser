/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import 'expo';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SmartLogin from './views/smart-login';

export default class GitHubBrowser extends Component {
  componentWillMount() {
    this.setState({isLoggedIn: false});
  }

  onLogin() {
    this.setState({isLoggedIn: true});
    console.log("Successful Login! Moving to next view.");
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome
          </Text>
        </View>
      )
    } else {
      return <SmartLogin onLogin={this.onLogin.bind(this)} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
