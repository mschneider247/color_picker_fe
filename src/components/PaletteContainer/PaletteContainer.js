import React, { Component } from 'react';
import './PaletteContainer.css';

class PaletteContainer extends Component {
  constructor() {
    super();
    this.state = {
      lockedIndex: -1,
    }
  }

  updateIndex(e) {
    if (parseInt(e.target.value) === parseInt(this.state.lockedIndex)) {
      this.setState({ lockedIndex: -1 })
      this.props.updateLockedIndex(-1)
    } else {
      this.setState({ lockedIndex: e.target.value })
      this.props.updateLockedIndex(e.target.value)
    }
  }

  render() {
    let colorBoxes = this.props.colors.map((color, index) => {
      let isLocked= false;
      let lockedClass = 'colorBox'
      if (index === parseInt(this.state.lockedIndex)) {
        isLocked = true;
        lockedClass = 'locked_colorBox'
      }
      let style = {
        backgroundColor: color
      }
      return (
        <div key={index} className={lockedClass} style={style}>
          <button className="lock_btn" value={index} onClick={(e) => this.updateIndex(e)}>{isLocked? '🔒' : '🔓' }</button>
          <p className="hexCode">{color}</p>
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