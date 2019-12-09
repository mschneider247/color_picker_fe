import React, { Component } from 'react';
import './App.css';
import Welcome from '../Welcome/Welcome';
import { fetchAllProjects, fetchAllPalettes } from '../../apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      palettes: [],
    }
  }

  componentDidMount = () => {
    fetchAllProjects()
      .then(projects => this.setState({ projects }))
      .catch(error => console.log(error))
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
