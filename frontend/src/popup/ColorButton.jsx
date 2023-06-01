//ColorButton.js
import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

const ColorButton = () => {
  const [color, setColor] = useState('#000')

  const handleChangeComplete = (color) => {
    setColor(color.hex)

    document.body.style.backgroundColor = color.hex
  }

  return <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
}

export default ColorButton
