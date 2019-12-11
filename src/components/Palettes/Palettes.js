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
        <h3>Add A New Palette:</h3>
        <input onChange={this.props.updatePaletteName} type='text'/>
        <button onClick={this.props.postPalette}>Add</button>
        <br />
        <div>{this.props.palettes}</div>
      </section>
    )
  }
};

export default Palettes;