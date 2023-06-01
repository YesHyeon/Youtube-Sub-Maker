import axios from 'axios'

let youtube_url = ''

chrome.runtime.onMessage.addListener(async (args) => {
  console.log(args)
  youtube_url = args.split('v=')[1]

  if (args.indexOf('emotional') == -1) {
    await fetch('http://127.0.0.1:5002/subtitle', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      // json 형식으로 전달하기
      body: JSON.stringify({ url: youtube_url }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
          console.log('1 pages', pages)
          console.log('1 pages[0]', pages[0])
          console.log('1 pages[0]-id', pages[0].id)
          chrome.tabs.sendMessage(pages[0].id, { data: data, message: 'notEmotional' })
        })
      })
      .catch((error) => console.log(error))
  } else {
    await fetch('http://127.0.0.1:5002/emotional', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      // json 형식으로 전달하기
      body: JSON.stringify({ url: youtube_url }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
          console.log('3 pages', pages)
          console.log('3 pages[0]', pages[0])
          console.log('3 pages[0]-id', pages[0].id)
          chrome.tabs.sendMessage(pages[0].id, { data: data })
        })
      })
      .catch((error) => console.log(error))
  }
})

export {}
