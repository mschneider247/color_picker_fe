import React, { Component } from 'react';
import './App.css';
import Welcome from '../Welcome/Welcome';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      palettes: [],
    }
  }

  render() {
    return (
      <section>
        <Welcome />
      </section>
    );
  };
}

export default App;
