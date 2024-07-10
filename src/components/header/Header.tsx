import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="app__info">
        <h1 className="app__title">Search for repositories in GitHub 👨‍💻</h1>
        <p className="app__descr">
          Enter a name and get the first 50 results in the format: "Account
          Name/Repository".
        </p>
      </div>
    );
  }
}

export default Header;
