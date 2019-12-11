import React, { Component } from 'react';
import './App.css';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import Palettes from '../Palettes/Palettes';
import PaletteContainer from '../PaletteContainer/PaletteContainer'
import { fetchAllProjects, fetchAllPalettes, addProject, addPalette, deleteProject, deletePalette } from '../../apiCalls';

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
    this.getProjects();
    this.getPalettes();
  }

  getProjects = () => {
    fetchAllProjects()
      .then(projects => this.setState({ projects }))
      .catch(error => console.log(error))
  }

  getPalettes = () => {
    fetchAllPalettes()
      .then(palettes => this.setState({ palettes }))
      .catch(error => console.log(error))
  }

  updateProject = (e) => {
    this.setState({ projectName: e.target.innerText });
    this.setState({ projectId: parseInt(e.target.value) });
  }

  updatePalette = (e, palette) => {
    this.setState({ paletteName: e.target.innerText });
    this.setState({ paletteId: parseInt(e.target.value) });
    this.setState({ 
      color1: palette.color1, 
      color2: palette.color2,
      color3: palette.color3,
      color4: palette.color4,
      color5: palette.color5,
      })
  }

  randomizeColors = () => {
    this.setState({ color1: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
    this.setState({ color2: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
    this.setState({ color3: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
    this.setState({ color4: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
    this.setState({ color5: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
  }

  updatePaletteName = (e) => {
    this.setState({ paletteName: e.target.value })
  };

  postPalette = async () => {
    const { color1, color2, color3, color4, color5, projectId, paletteName } = this.state;
    if (color1 !== '' && color2 !== '' && color3 !== '' && color4 !== '' && color5 !== '' && projectId !== 0 && paletteName !== '') {
      await addPalette({ projectId, name: paletteName, color1, color2, color3, color4, color5 })
    }
    this.getPalettes();
  };

  addNewProject = async (name) => {
    let projectId = 1 + this.state.projects.length
    let request = {
      "projectId": projectId,
      "name": name
    }
    await addProject(request);
    this.getProjects();
  }

  deleteProjectAndPalettes = async (projectId) => {
    await this.state.palettes.forEach(palette => {
      if (palette.projectId === projectId){
        this.removePalette(palette.id)
      }
    })
    await deleteProject(projectId)
    this.getProjects();
    this.getPalettes();
  }

  removePalette = async (id) => {
    await deletePalette(parseInt(id))
    this.getPalettes();
  }

  render() {
    const { color1, color2, color3, color4, color5} = this.state;
    const displayPalettes = this.state.palettes.filter(palette => palette.projectId === this.state.projectId)
    const paletteName = displayPalettes.map(palette => {
      return (
        <div key={palette.id}>
          <button value={palette.id} onClick={(e) => this.updatePalette(e, palette)}>{palette.name}</button>
          <button value={palette.id} onClick={() => this.removePalette(palette.id)}>X</button>
        </div>
      )
    })
    const displayProjects = this.state.projects.map(project => {
        return (
          <div key={project.id} className="project_box">
            <button className="project_name-btn" value={project.projectId} onClick={(e) => this.updateProject(e)}>{project.name}</button>
            <button className="project_delete-btn" value={project.projectId} onClick={() => this.deleteProjectAndPalettes(project.projectId)}>X</button>
          </div>
        )
      })
    return (
      <section id="app">
        <Welcome />
        <Projects projects={displayProjects} addProject={this.addNewProject}/>
        <Palettes palettes={paletteName} updatePaletteName={this.updatePaletteName} postPalette={this.postPalette}/>
        <PaletteContainer colors={[color1, color2, color3, color4, color5]} />
        <button onClick={this.randomizeColors}>Randomize Palette</button>
      </section>
    );
  };
}

export default App;
