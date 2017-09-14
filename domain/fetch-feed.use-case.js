'use strict'

import Toolbox from '../toolbox'

export default class FetchFeed {
  execute() {
    return new Promise((resolve, reject) => {
      Toolbox.getAuth((err, authInfo) => {
        if (err) {
          reject(err)
        }

        resolve(authInfo)
        })
    })
    .then((authInfo) => {
      const url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/received_events?per_page=100'

      return fetch(url, {
        headers: {
          Authorization: 'Basic ' + authInfo.auth
        }
      })})
    .then(response => response.json())
  }
}
