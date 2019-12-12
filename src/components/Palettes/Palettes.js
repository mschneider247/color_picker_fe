import React, { Component } from 'react';
import './Palettes.css';

class Palettes extends Component {
  constructor() {
    super();
    this.state = {
      paletteName: ''
    }
  }

  updateState = async (event) => {
    await this.setState({ paletteName: event.target.value })
    this.props.updatePaletteName(this.state.paletteName)
  }

  addNewPalette = () => {
    this.props.postPalette();
    this.setState({ paletteName: ''})
  }

  render () {
    return(
      <section>
        <div id="add_new_palette">
          <div>
            <h2 id="palettes">Palettes:</h2>
            <h3>Add A New Palette:</h3>
            <input className="input_palette" value={this.state.paletteName} placeholder="    Palette Name" onChange={event => this.updateState(event)} type='text'/>
            <button className="input_palette-btn" onClick={this.addNewPalette}>+</button>
            <br />
          </div>
          <div id="randomize_div">
            <p>Select between Palettes or</p>
            <p>randomly generate new colors!</p>
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