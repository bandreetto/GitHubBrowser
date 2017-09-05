'use strict';

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo}
          source={require('./img/Octocat.png')} />
        <Text style={styles.heading}>
          GitHub Browser
        </Text>
        <TextInput style={styles.input}
          placeholder="GitHub Username" />
        <TextInput style={styles.input}
          placeholder="GitHub Password"
          secureTextEntry="true" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  }
});
