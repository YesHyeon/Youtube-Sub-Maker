import React, { useState } from 'react'
import './Popup.css'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  const handleStartButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'start' })
    })
  }

  return (
    <main>
      <div className="App">
        <header className="App-header">
          <p>유튜브 자동자막 생성 서비스22</p>
          <button onClick={handleStartButtonClick}>자막생성</button>
        </header>
      </div>
    </main>
  )
}

export default App
