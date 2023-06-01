//ColorButton.js
import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

const BackgroundColorButton = () => {
  const [color, setColor] = useState('#000')

  const handleChangeComplete = (color) => {
    setColor(color.hex)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: color, message: 'backgroundColor' })
    })
  }

  return <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
}

export default BackgroundColorButton
