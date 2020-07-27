import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss';
ColorBox.propTypes = {};

function ColorBox(props) {
  const [color, setColor] = useState(() => {
    return localStorage.getItem('color') || 'deeppink';
  });
  const colorRef = useRef('');
  const handleColorChange = () => {
    const newColor = getRandomColor();
    colorRef.current = newColor;
    setColor(newColor);
    localStorage.setItem('color', newColor);
  };
  function getRandomColor() {
    const COLOR_LIST = ['yellow', 'red', 'blue', 'deeppink'];
    let randomIndex = -1;
    do {
      randomIndex = Math.trunc(Math.random() * 4);
    } while (COLOR_LIST[randomIndex] === colorRef.current);
    return COLOR_LIST[randomIndex];
  }
  return (
    <div
      onClick={handleColorChange}
      className="color-box"
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default ColorBox;
