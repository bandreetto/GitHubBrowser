'use strict'

import React, {Component} from 'react'
import Login from './login.js'
import LoginAuth from '../../domain/login.use-case.js'

export default class SmartLogin extends Component {
    constructor() {
        super()

        this.state = {
            fetching: false
        }
    }

    loginHandler = async () => {
        console.log('Attempting to log in with username ' + this.state.username)
        this.setState({fetching: true})

        const newLogin = new LoginAuth(this.state.username,
            this.state.password)

        const results = await newLogin.execute()
            .then(results => {
                this.setState({success: true})

                return results
            })
            .catch(err => {
                if (err.badCredentials || err.unknownError) {
                    this.setState(err)
                    this.setState({success: false})
                }

                throw err
            })
            .finally(results => {
                this.setState({fetching: false})

                return results
            })
        console.log(results)

        if (this.state.success && this.props.onLogin) {
            this.props.onLogin()
        }
    }

    setUsername = (username) => {
        this.setState({username: username})
    }

    setPassword = (password) => {
        this.setState({password: password})
    }

    render() {
        return (
            <Login
                onLoginPressed={this.loginHandler}
                showProgress={this.state.fetching}
                setUsername={this.setUsername}
                setPassword={this.setPassword}
                badCredentials={this.state.badCredentials}
                unknownError={this.state.unknownError}
                successfulLogin={this.state.success}/>)
    }
}
