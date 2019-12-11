import React, { Component } from 'react';
import './App.css';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import Palettes from '../Palettes/Palettes';
import PaletteContainer from '../PaletteContainer/PaletteContainer'
import { fetchAllProjects, fetchAllPalettes, addPalette } from '../../apiCalls';
import PalettesContainer from '../PaletteContainer/PaletteContainer';

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

  postPalette = () => {
    const { color1, color2, color3, color4, color5, projectId, paletteName } = this.state;
    if (color1 !== '' && color2 !== '' && color3 !== '' && color4 !== '' && color5 !== '' && projectId !== 0 && paletteName !== '') {
      addPalette({ projectId, name: paletteName, color1, color2, color3, color4, color5 })
    }
  };

  render() {
    const displayPalettes = this.state.palettes.filter(palette => palette.projectId === this.state.projectId)
    const paletteName = displayPalettes.map(palette => {
      return (<button key={palette.id} value={palette.id} onClick={(e) => this.updatePalette(e, palette)}>{palette.name}</button>)
    })
    const displayProjects = this.state.projects.map(project => {
        return (<button key={project.id} value={project.projectId} onClick={(e) => this.updateProject(e)}>{project.name}</button>)
      })
    const { color1, color2, color3, color4, color5} = this.state;
    console.log(this.state)
    return (
      <section id="app">
        <Welcome />
        <Projects projects={displayProjects} />
        <Palettes palettes={paletteName} updatePaletteName={this.updatePaletteName} postPalette={this.postPalette}/>
        <PalettesContainer colors={[color1, color2, color3, color4, color5]} />
        <button onClick={this.randomizeColors}>Randomize Palette</button>
      </section>
    );
  };
}

export default App;
