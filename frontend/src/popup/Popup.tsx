import React, { useState } from 'react'
import './Popup.css'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  const handleFillButtonClick = () => {
    chrome.runtime.sendMessage('원하는 메시지')
  }

  return (
    <main>
      <div className="App">
        <header className="App-header">
          <p>유튜브 자동자막 생성 서비스</p>
          <button onClick={handleFillButtonClick}>자막생</button>
        </header>
      </div>
    </main>
  )
}

export default App
