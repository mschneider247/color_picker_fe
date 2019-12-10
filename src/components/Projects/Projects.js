import React, { Component } from 'react';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      currentProject: {}
    }
  }

  render () {
    return(
      <section>
        <p>Projects!</p>
      </section>
    )
  }
};

export default Projects;