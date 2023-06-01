import React, { useCallback, useState } from 'react'
import { ChromePicker } from 'react-color'
// import './Popup.css'
import ColorButton from './ColorButton'
import styled from 'styled-components'

function App() {
  const [colorClick, setColorClick] = useState(false)
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
      <Header>자동자막 메이커</Header>
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
            <ArrowButton>v</ArrowButton>
          </SettingWrapper>
        </SettingList>
        <SettingList>
          <SettingWrapper>
            <SettingText>자막색성</SettingText>
            <ArrowButton
              onClick={() => {
                setColorClick((prev) => !prev)
              }}
            >
              v
            </ArrowButton>
          </SettingWrapper>
        </SettingList>
      </SettingWrap>
      {colorClick ? (
        <ColorWrapper>
          <ColorButton />
        </ColorWrapper>
      ) : null}
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
  margin-bottom: 20px;
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

const Button = styled.button``

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
  position: relative;
  top: 100px;
  width: 300px;
  height: 20px;
  background-color: white;
`

export default App
