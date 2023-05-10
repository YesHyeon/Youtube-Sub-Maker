import axios from 'axios'

chrome.runtime.onMessage.addListener(async (args) => {
  console.log('백그라운드 전달 완료')

  const formData = new FormData()
  formData.append('fileName', 'fileName')

  fetch('http://127.0.0.1:5002/subtitle', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: 'd',
    }),
  })
    .then((res) => console.log('성공', res))
    .catch((data) => console.log(data))
})

export {}
