import axios from 'axios'

chrome.runtime.onMessage.addListener(async (args) => {
  console.log('This is the background page.')
  console.log('Put the background scripts here.')

  fetch('http://127.0.0.1:5002/users')
    .then(
      // response 객체의 json() 이용하여 json 데이터를 객체로 변화
      (res) => console.log('성공', res),
    )
    .catch(
      // 데이터를 콘솔에 출력
      (data) => console.log(data),
    )

  console.log(args)
})

export {}
