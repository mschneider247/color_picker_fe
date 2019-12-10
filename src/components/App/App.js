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
      projectName: '',
      paletteName: '',
      projectId: 0,
      id: 0,
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      color5: ''
    }
  }

  componentDidMount = () => {
    fetchAllProjects()
      .then(projects => this.setState({ projects }))
      .catch(error => console.log(error))

    fetchAllPalettes()
      .then(palettes => this.setState({ palettes }))
      .catch(error => console.log(error))
  }


  render() {
    const displayProjects = this.state.projects.map(project => {
        return (<p>{project.name}</p>)
      })
    return (
      <section>
        <Welcome />
        <section>
        {displayProjects}
        </section>
      </section>
    );
  };
}

export default App;
