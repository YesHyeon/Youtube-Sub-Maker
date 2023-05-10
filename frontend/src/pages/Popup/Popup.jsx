import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const handleFillButtonClick = () => {
    chrome.runtime.sendMessage('원하는 메시지');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>유튜브 자동자막 생성 서비스</p>
        <button onClick={handleFillButtonClick}>자막생성</button>
      </header>
    </div>
  );
};

export default Popup;
