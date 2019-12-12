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
      color5: '',
      lockedIndex: -1
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
    let currentProjectId = parseInt(e.target.value);
    let currentPalette = this.state.palettes.find(palette => palette.projectId === currentProjectId)
    this.updatePalette(e, currentPalette);
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
    const { color1, color2, color3, color4, color5, lockedIndex } = this.state;
    const colors = [color1, color2, color3, color4, color5]
    if (lockedIndex === null) {
      this.setState({ color1: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
      this.setState({ color2: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
      this.setState({ color3: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
      this.setState({ color4: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
      this.setState({ color5: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
    } else {
      colors.forEach((color, index) => {
        if (index !== parseInt(lockedIndex)) {
          let selectedColor = `color${index + 1}`
          this.setState({[selectedColor]: '#'+(Math.random()*0xFFFFFF<<0).toString(16)})
        }
      })
    }
  }

  updateLockedIndex = (index) => {
    this.setState({ lockedIndex: index });
  }

  updatePaletteName = (name) => {
    this.setState({ paletteName: name })
  };

  postPalette = async () => {
    const { color1, color2, color3, color4, color5, projectId, paletteName } = this.state;
    if (color1 !== '' && color2 !== '' && color3 !== '' && color4 !== '' && color5 !== '' && projectId !== 0 && paletteName !== '') {
      await addPalette({ projectId, name: paletteName, color1, color2, color3, color4, color5 })
    }
    await this.getPalettes();
    setTimeout(() => {
      let newPalette = this.state.palettes.find(palette => palette.name === paletteName);
      if (newPalette) {
        this.setState({ paletteId: newPalette.id})
      } 
    }, 100);
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

  buildPaletteCards = (displayPalettes) => {
    const paletteName = displayPalettes.map(palette => {
      let selectedPalette = '';
      if (palette.id === this.state.paletteId) {
        selectedPalette = "selected_palette_box"
      } else {
        selectedPalette = "palette_box"
      }
      return (
        <div key={palette.id} className={selectedPalette}>
          <button className="palette_name-btn" value={palette.id} onClick={(e) => this.updatePalette(e, palette)}>{palette.name}</button>
          <button className="palette_delete-btn" value={palette.id} onClick={() => this.removePalette(palette.id)}>X</button>
        </div>
      )
    })
    return paletteName;
  };

  buildProjectCards = (projects) => {
    let builtProjects = projects.map(project => {
      let selectedProject = '';
      if (project.projectId === this.state.projectId) {
        selectedProject = "selected_project_box"
      } else {
        selectedProject = "project_box"
      };
      return (
        <div key={project.id} className={selectedProject}>
          <button className="project_name-btn" value={project.projectId} onClick={(e) => this.updateProject(e)}>{project.name}</button>
          <button className="project_delete-btn" value={project.projectId} onClick={() =>  this.deleteProjectAndPalettes(project.projectId)}>X</button>
        </div>
      );
    });
    return builtProjects;
  }

  render() {
    const { color1, color2, color3, color4, color5} = this.state;
    const displayPalettes = this.state.palettes.filter(palette => palette.projectId === this.state.projectId)
    const showPalettes = this.buildPaletteCards(displayPalettes);
    const showProjects = this.buildProjectCards(this.state.projects);
    return (
      <section id="app">
        <Welcome />
        <Projects projects={showProjects} addProject={this.addNewProject}/>
        <Palettes palettes={showPalettes} updatePaletteName={this.updatePaletteName} postPalette={this.postPalette} randomizeColors={this.randomizeColors}/>
        <PaletteContainer colors={[color1, color2, color3, color4, color5]} updateLockedIndex={this.updateLockedIndex} />
      </section>
    );
  };
}

export default App;
