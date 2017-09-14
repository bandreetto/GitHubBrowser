'use strict'

import buffer from 'buffer'
import Toolbox from '../toolbox'

export default class LoginAuth {
    constructor(username, password) {
        this.state = {
            username: username,
            password: password
        }
    }

    execute() {
        const buff = new buffer.Buffer(this.state.username +
            ':' + this.state.password)
        const encodedAuth = buff.toString('base64')

        return fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                }

                throw {
                    badCredentials: response.status === 401,
                    unknownError: response.status !== 401
                }
            })
            .then(response => {
                return response.json()
            })
            .then(results => {
                Toolbox.saveAuth(encodedAuth, results)
                return results
            })
            .catch(err => {
                console.warn('Login failed: ' + (err.badCredentials ? 'Bad credentials'
                    : 'Uknown error'))

                throw err
            })
    }
}
