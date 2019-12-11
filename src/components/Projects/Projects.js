import React, { Component } from 'react';

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
        <h3 id="projects">Projects:</h3>
        <h3>Add A New Project:</h3>
        <input 
          className="input-project"
          type="text"
          placeholder="Project Name"
          name="projectName"
          value={this.state.projectName}
          onChange={event => this.updateState(event)}
        />
        <button onClick={() => this.addNewProject()}>+</button>
        <br />
        {this.props.projects}
      </section>
    )
  }
};

export default Projects;