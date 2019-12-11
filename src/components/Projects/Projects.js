import React, { Component } from 'react';
import './Projects.css';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projectName: ''
    }
  }

  updateState = (event) => {
    this.setState({ projectName: event.target.value})
  }

  addNewProject = () => {
    if (this.state.projectName !== '') {
      this.props.addProject(this.state.projectName)
      this.setState({ projectName: ''})
    }
  }

  render () {
    return(
      <section>
        <div id="add_new_project">
          <h2 id="projects">Projects:</h2>
          <h3>Add A New Project:</h3>
          <input 
            className="input_project"
            type="text"
            placeholder="    Project Name"
            name="projectName"
            value={this.state.projectName}
            onChange={event => this.updateState(event)}
          />
          <button className="input_name-btn" onClick={() => this.addNewProject()}>+</button>
          <br />
        </div>
        <div id="projects_div">
          {this.props.projects}
        </div>
      </section>
    )
  }
};

export default Projects;