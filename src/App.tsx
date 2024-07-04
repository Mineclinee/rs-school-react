import { Component } from 'react';
import './App.scss';

export class App extends Component {
  state = {
    age: 42,
  };

  handleAgeChange = () => {
    this.setState({
      age: this.state.age + 1,
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleAgeChange}>Increment age</button>
        <p>You are {this.state.age}.</p>
      </>
    );
  }
}

export default App;
