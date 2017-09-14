/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import 'expo'
import React, {Component} from 'react'
import {ActivityIndicator, AppRegistry, StyleSheet, View} from 'react-native'
import Toolbox from './toolbox'
import SmartLogin from './views/login/smart-login'
import MainView from './views/main-view'

export default class GitHubBrowser extends Component {
    componentWillMount() {
        this.state = {
            isLoggedIn: false,
            checkingAuth: true
        }
    }

    componentDidMount() {
        Toolbox.getAuth((err, authInfo) => {
            this.setState({
                isLoggedIn: authInfo != null,
                checkingAuth: false
            })
        })
    }

    onLogin() {
        this.setState({isLoggedIn: true})

        console.log("Successful Login! Moving to next view.")
    }

    render() {
        if (this.state.checkingAuth) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={true}
                        size='large'
                        style={styles.loader}/>
                </View>
            )
        }

        if (this.state.isLoggedIn) {
            return <MainView/>
        } else {
            return <SmartLogin onLogin={this.onLogin.bind(this)}/>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20
    }
})

AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser)

