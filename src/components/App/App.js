import React, { Component } from 'react';
import './App.css';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects'
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

  updatePalettes = (e) => {
    this.setState({ projectName: e.target.innerText });
    this.setState({ projectId: parseInt(e.target.value) });
  }

  render() {
    const displayPalettes = this.state.palettes.filter(palette => palette.projectId === this.state.projectId)
    const paletteName = displayPalettes.map(palette => palette.name)
    const displayProjects = this.state.projects.map(project => {
        return (<button value={project.projectId} onClick={(e) => this.updatePalettes(e)}>{project.name}</button>)
      })
    return (
      <section>
        <Welcome />
        <Projects projects={displayProjects} />
        {/* {displayProjects} */}
        {paletteName}
      </section>
    );
  };
}

export default App;
