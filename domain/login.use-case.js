'use strict';

export default new class LoginUseCase {
  doLogin() {
    return fetch('https://api.github.com/search/repositories?q=react')
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }
}
