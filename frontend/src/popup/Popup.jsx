import React, { useCallback, useState } from 'react'
import { ChromePicker } from 'react-color'
// import './Popup.css'
import BackgroundColorButton from './BackgroundColorButton'
import TextColorButton from './TextColorButton'
import styled from 'styled-components'

import logo from '../../src/assets/logo.png'

function App() {
  const [backgroundColor, setBackgroundColorClick] = useState(false)
  const [textColor, setTextColorClick] = useState(false)
  const [textClick, setTextClick] = useState(false)

  const [textSize, setTextSIze] = useState(20)

  const handleStartButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'start' })
    })
  }

  const handleTextSizeUpButtonClick = useCallback(() => {
    setTextSIze(textSize + 1)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: textSize, message: 'textSize' })
    })
  }, [textSize])

  const handleTextSizeDownButtonClick = useCallback(() => {
    setTextSIze(textSize - 1)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: textSize, message: 'textSize' })
    })
  }, [textSize])

  return (
    <Wrap>
      <Header>
        <HeaderLogo />
      </Header>
      <SettingWrap>
        <SettingList>
          <SettingWrapper>
            <SettingText>글자크기</SettingText>
            <ArrowButton
              onClick={() => {
                setTextClick((prev) => !prev)
              }}
            >
              v
            </ArrowButton>
          </SettingWrapper>
        </SettingList>
        {textClick ? (
          <TextSettingWrapper>
            <TextSettingText>{textSize}</TextSettingText>
            <ButtonWrapper>
              <ArrowButton onClick={handleTextSizeUpButtonClick}>^</ArrowButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <ArrowButton onClick={handleTextSizeDownButtonClick}>v</ArrowButton>
            </ButtonWrapper>
          </TextSettingWrapper>
        ) : null}
        <SettingList>
          <SettingWrapper>
            <SettingText>배경색상</SettingText>
            <ArrowButton
              onClick={() => {
                setBackgroundColorClick((prev) => !prev)
              }}
            >
              v
            </ArrowButton>
          </SettingWrapper>
        </SettingList>
        {backgroundColor ? (
          <ColorWrapper>
            <BackgroundColorButton />
          </ColorWrapper>
        ) : null}
        <SettingList>
          <SettingWrapper>
            <SettingText>자막색상</SettingText>
            <ArrowButton
              onClick={() => {
                setTextColorClick((prev) => !prev)
              }}
            >
              v
            </ArrowButton>
          </SettingWrapper>
        </SettingList>
        {textColor ? (
          <ColorWrapper>
            <TextColorButton />
          </ColorWrapper>
        ) : null}
      </SettingWrap>

      <Button onClick={handleStartButtonClick}>자막생성</Button>
    </Wrap>
  )
}

const Wrap = styled.div`
  text-align: center;
  padding: 1em;
  margin: 0 auto;
  width: 20rem;
  height: 100%;
  background-color: white;
  color: black;
`

const Header = styled.div`
  font-size: 15px;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderLogo = styled.div`
  width: 100px;
  height: 70px;
  background-image: url(${logo});
  background-size: cover;
`

const SettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SettingList = styled.div`
  width: 50%;
  height: 25px;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`

const SettingText = styled.div`
  color: black;
`

const SettingWrapper = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 15px;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
`

const Button = styled.button`
  background-color: #dd2c28;
  border: none;
  margin: 10px;
  padding-block: 5px;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #ff4d4d;
  }
  border-radius: 5px;
`

const ButtonWrapper = styled.button`
  display: flex;
  background-color: white;
  margin: 3px;
`

const ArrowButton = styled.div`
  color: grey;
  cursor: pointer;
`

const TextSettingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 30px;
  margin-bottom: 5px;
`

const TextSettingText = styled.div`
  font-size: 15px;
  margin: 5px;
`

const ColorWrapper = styled.div`
  top: 100px;
  width: 300px;
  height: 20px;
  background-color: white;
  z-index: 100;
`

export default App
