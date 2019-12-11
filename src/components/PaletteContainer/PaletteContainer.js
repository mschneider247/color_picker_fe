import React, { Component } from 'react';
import './PaletteContainer.css';

class PaletteContainer extends Component {
  constructor() {
    super();
    this.state = {
      lockedIndex: null
    }
  }

  updateIndex(e) {
    this.props.updateLockedIndex(e.target.value)
  }

  render() {
    let colorBoxes = this.props.colors.map((color, index) => {
      let style = {
        backgroundColor: color
      }
      return (
        <div key={index} className="colorBox" style={style}>
          <button value={index} onClick={(e) => this.updateIndex(e)}>Lock</button>
        </div>
      )
    });
    return(
      <section id="Section_PaletteContainer">
        {colorBoxes}
      </section>
    )
  }
}

export default PaletteContainer;