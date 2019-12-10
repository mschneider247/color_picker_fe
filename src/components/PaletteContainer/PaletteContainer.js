import React from 'react';
import './PaletteContainer.css'

const PalettesContainer = (props) => {

  let colorBoxes = props.colors.map((color, index) => {
    let style = {
      backgroundColor: color
    }
    return (
      <div key={index} className="colorBox" style={style}></div>
    )
  });

  return(
    <section id="Section_PaletteContainer">
      {colorBoxes}
    </section>
  )
};

export default PalettesContainer;