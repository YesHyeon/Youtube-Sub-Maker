//ColorButton.js
import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

const TextColorButton = () => {
  const [color, setColor] = useState('#000')

  const handleChangeComplete = (color) => {
    setColor(color.hex)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: color, message: 'textColor' })
    })
  }

  return <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
}

export default TextColorButton
