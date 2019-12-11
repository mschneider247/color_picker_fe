import React, { Component } from 'react';
import './Palettes.css';

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
        <div id="add_new_palette">
          <div>
            <h2 id="palettes">Palettes:</h2>
            <h3>Add A New Palette:</h3>
            <input className="input_palette" placeholder="    Palette Name" onChange={this.props.updatePaletteName} type='text'/>
            <button className="input_palette-btn" onClick={this.props.postPalette}>+</button>
            <br />
          </div>
          <div id="randomize_div">
            <button id="random_btn" onClick={this.props.randomizeColors}>Randomize Palette</button>
          </div>
        </div>
        <div id="palettes_div">
          {this.props.palettes}
        </div>
      </section>
    )
  }
};

export default Palettes;