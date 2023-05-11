import axios from 'axios'

chrome.runtime.onMessage.addListener(async (args) => {
  console.log(args)
  const youtube_url = args.split('v=')[1]

  const formData = new FormData()
  formData.append('fileName', 'dsds')

  fetch('http://127.0.0.1:5002/subtitle', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    // json 형식으로 전달하기
    body: JSON.stringify({ url: youtube_url }),
  })
    .then((res) => console.log('성공', res))
    .catch((data) => console.log(data))
})

export {}
