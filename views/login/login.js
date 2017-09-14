'use strict'

import React, {Component} from 'react'
import {ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native'

export default class Login extends Component {
    render() {
        let errorCtrl = <View/>

        if (!this.props.successfulLogin() && this.props.badCredentials()) {
            errorCtrl = (<Text style={styles.error}>
                Username or password incorrect
            </Text>)
        }

        if (!this.props.successfulLogin() && this.props.unknownError()) {
            errorCtrl = (<Text style={styles.error}>
                An unexpected error occoured trying to log you in
            </Text>)
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                       source={require('../../img/Octocat.png')}/>
                <Text style={styles.heading}>
                    GitHub Browser
                </Text>
                <TextInput
                    onChangeText={text => {
                        this.props.setUsername(text)
                    }}
                    style={styles.input}
                    placeholder="GitHub Username"/>
                <TextInput style={styles.input}
                           onChangeText={text => this.props.setPassword(text)}
                           placeholder="GitHub Password"
                           secureTextEntry={true}/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.props.onLoginPressed}>
                    <Text
                        style={styles.buttonText}>
                        Log In
                    </Text>
                </TouchableHighlight>

                {errorCtrl}
                <ActivityIndicator
                    animating={this.props.showProgress()}
                    size="large"
                    style={styles.loader}/>
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
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
})


