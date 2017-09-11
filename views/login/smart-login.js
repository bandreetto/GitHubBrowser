'use strict';

import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet } from 'react-native';
import Login from './login.js';
import LoginAuth from '../../domain/login.use-case.js';

export default class SmartLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false
    }
  }

  async loginHandler() {
    console.log('Attempting to log in with username ' + this.state.username);
    this.setState({fetching: true});

    var newLogin = new LoginAuth(this.state.username,
      this.state.password);

    var results = await newLogin.execute()
      .then(results => {
        this.setState({success: true});
        return results;
      })
      .catch(err => {
        if (err.badCredentials || err.unknownError) {
          this.setState(err);
          this.setState({success: false});
        }

        throw err;
      })
      .finally(results => {
          this.setState({fetching: false});
          return results;
        });
    console.log(results);

    if (this.state.success && this.props.onLogin) {
      this.props.onLogin();
    }
  }

  setUsername(username) {
    this.setState({username: username});
  }

  setPassword(password) {
    this.setState({password: password});
  }

  showProgress() {
    return this.state.fetching;
  }

  successfulLogin() {
    return this.state.success;
  }

  badCredentialsError() {
    return this.state.badCredentials;
  }

  unknownError() {
    return this.state.unknownError;
  }

  render() {
    return (
      <Login
        onLoginPressed={this.loginHandler.bind(this)}
        showProgress={this.showProgress.bind(this)}
        setUsername={this.setUsername.bind(this)}
        setPassword={this.setPassword.bind(this)}
        badCredentials={this.badCredentialsError.bind(this)}
        unknownError={this.unknownError.bind(this)}
        successfulLogin={this.successfulLogin.bind(this)} />)
  }
}
