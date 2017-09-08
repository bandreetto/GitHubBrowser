'use strict';

import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet } from 'react-native';
import Login from './login.js';
import { LoginUseCase } from '../domain/login.use-case.js';

export default class SmartLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false
    }
  }

  loginHandler() {
    console.log('Attempting to log with username ' + this.state.username);
    this.setState({fetching: true});
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

  render() {
    return (
      <Login
        onLoginPressed={this.loginHandler.bind(this)}
        showProgress={this.showProgress.bind(this)}
        setUsername={this.setUsername.bind(this)}
        setPassword={this.setPassword.bind(this)} />)
  }
}