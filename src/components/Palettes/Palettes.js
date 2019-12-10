import React, { Component } from 'react';

class Palettes extends Component {
  constructor() {
    super();
    this.state = {
      currentPalette: {}
    }
  }

  render () {
    return(
      <section>
        <p>{this.props.palettes}</p>
      </section>
    )
  }
};

export default Palettes;