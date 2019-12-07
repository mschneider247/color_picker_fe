import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      palettes: [],
    }
  }

  render() {
    return (
      <p>This is Color_Picker_FE</p>
    );
  }


}

export default App;
