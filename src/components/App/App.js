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
      paletteId: 0,
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

  updateProject = (e) => {
    this.setState({ projectName: e.target.innerText });
    this.setState({ projectId: parseInt(e.target.value) });
  }

  updatePalette = (e) => {
    this.setState({ paletteName: e.target.innerText });
    this.setState({ paletteId: parseInt(e.target.value) });
  }


  render() {
    const displayPalettes = this.state.palettes.filter(palette => palette.projectId === this.state.projectId)
    const paletteName = displayPalettes.map(palette => {
      return (<button value={palette.id} onClick={(e) => this.updatePalette(e)}>{palette.name}</button>)
    })
    const displayProjects = this.state.projects.map(project => {
        return (<button value={project.projectId} onClick={(e) => this.updateProject(e)}>{project.name}</button>)
      })
    return (
      <section>
        <Welcome />
        {displayProjects}
        {paletteName}
      </section>
    );
  };
}

export default App;
