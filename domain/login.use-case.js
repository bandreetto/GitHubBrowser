'use strict';

import buffer from 'buffer';

export default class LoginAuth {
  constructor(username, password) {
    this.state = {
      username: username,
      password: password
    }
  }

  execute() {
    var buff = new buffer.Buffer(this.state.username +
      ':' + this.state.password);
    var encodedAuth = buff.toString('base64');

    return fetch('https://api.github.com/user', {
        headers: {
          'Authorization' : 'Basic ' + encodedAuth
        }
      })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.warn('Login failed: ' + (error.badCredentials ? 'Bad credentials' 
                                                              : 'Uknown error'));
      });
  }
}
