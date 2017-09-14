'use strict'

import {AsyncStorage} from 'react-native'
import _ from 'lodash'

let instance

export default new class Toolbox {
    constructor() {
        if (!instance) {
            instance = this
        }

        return instance
    }

    saveAuth(auth, user) {
        AsyncStorage.multiSet([
            ['auth', auth],
            ['user', JSON.stringify(user)]
        ], err => {
            if (err) {
                throw err
            }
        })
    }

    getAuth() {
        return AsyncStorage.multiGet(['auth', 'user'])
            .then(savedAuth => {
                if (!savedAuth) {
                    return null
                }

                const zippedAuth = _.fromPairs(savedAuth)

                if (!zippedAuth['auth']) {
                    return null
                }

                const authInfo = {
                    auth: zippedAuth['auth'],
                    user: JSON.parse(zippedAuth['user'])
                }

                return authInfo
            })
    }
}
