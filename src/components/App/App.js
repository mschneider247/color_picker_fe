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

  getPalettes = (e) => {
    fetchAllPalettes()
      .then(palettes => {
        return palettes.filter(palette => palette.projectId.includes(e.target.value))
      })
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
