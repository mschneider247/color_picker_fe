import React, { Component } from 'react';
import './PaletteContainer.css';
import { thisExpression } from '@babel/types';

class PaletteContainer extends Component {
  constructor() {
    super();
    this.state = {
      lockedIndex: -1,
    }
  }

  updateIndex(e) {
    if (e.target.value == parseInt(this.state.lockedIndex)) {
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
      if (index === parseInt(this.state.lockedIndex)) {
        isLocked = true;
      }
      let style = {
        backgroundColor: color
      }
      return (
        <div key={index} className="colorBox" style={style}>
          <button className="lock_btn" value={index} onClick={(e) => this.updateIndex(e)}>{isLocked? '🔒' : '🔓' }</button>
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