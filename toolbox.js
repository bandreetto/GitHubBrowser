'use strict';

import { AsyncStorage } from 'react-native';
import _ from 'lodash';

let instance;

export default new class Toolbox {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
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

  getAuth(callback) {
    AsyncStorage.multiGet(['auth', 'user'], (err, savedAuth) => {
      if (err) {
        return callback(err);
      }

      if (!savedAuth) {
        return callback();
      }

      var zippedAuth = _.fromPairs(savedAuth);

      if (!zippedAuth['auth']) {
        return callback();
      }

      var authInfo = {
        auth: zippedAuth['auth'],
        user: JSON.parse(zippedAuth['user'])
      }

      return callback(null, authInfo);
    })
  }
}
