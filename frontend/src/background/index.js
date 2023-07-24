import axios from 'axios'

let youtube_url = ''

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js

  if (changeInfo.url) {
    chrome.tabs.reload(function () {})

    chrome.tabs.sendMessage(tabId, {
      message: 'urlChange',
      url: changeInfo.url,
    })
  }
})

chrome.runtime.onMessage.addListener(async (args) => {
  youtube_url = args.split('v=')[1]
  if (args == 'URL') {
    return
  }

  // 감성분석 진행 전 자막불러오기
  if (args.indexOf('getEmotionValue') == -1) {
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
        chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
          console.log('1 pages', pages)
          console.log('1 pages[0]', pages[0])
          console.log('1 pages[0]-id', pages[0].id)
          chrome.tabs.sendMessage(pages[0].id, { data: data, message: 'gotSubtitle' })
        })
      })
      .catch((error) => console.log(error))
  } else {
    // 자막불러 온 후 감정분석 진행
    await fetch('http://127.0.0.1:5002/emotional', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ url: youtube_url }),
    })
      .then((response) => response.json())
      .then((data) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
          console.log('3 pages', pages)
          console.log('3 pages[0]', pages[0])
          console.log('3 pages[0]-id', pages[0].id)
          chrome.tabs.sendMessage(pages[0].id, { data: data, message: 'gotEmotionValue' })
        })
      })
      .catch((error) => console.log(error))
  }
})

export {}
