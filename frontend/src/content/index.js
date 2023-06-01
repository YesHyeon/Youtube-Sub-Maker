chrome.runtime.sendMessage(window.location.href)

let subtitle = ''
// 이전,현재,다음시간을 불러오기 위한 배열 생성
let timeArray = []

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  subtitle = message.data.textObj
  console.log(subtitle)
  for (let i in subtitle) {
    timeArray.push(i)
  }
  console.log(timeArray)
  if (message.message == 'gotSubtitle') {
    chrome.runtime.sendMessage(`${window.location.href} getEmotionValue`)
  }
})

const main = () => {
  const mutation = async () => {
    const target = document.querySelector('#body.ytd-transcript-search-panel-renderer')
    const testTarget = document.getElementsByClassName('ytp-time-display notranslate')[0]

    // 2. 옵저버 콜백 생성
    const callback = (mutationList, observer) => {
      const target = document.querySelector('#body.ytd-transcript-search-panel-renderer')
      const textClass = target.getElementsByClassName(
        'style-scope ytd-transcript-segment-list-renderer active',
      )

      const text = textClass[0].innerText.split('\n')[1]
      const time = textClass[0].innerText.split('\n')[0]

      let buttonSelector = belowId.querySelector('button')
      currentTag.innerText = text
    }

    const testCallback = () => {
      const target = document.querySelector('#body.ytd-transcript-search-panel-renderer')
      const textClass = target.getElementsByClassName(
        'style-scope ytd-transcript-segment-list-renderer active',
      )
      // innerText 존재하지 않는 경우 분기처리
      if (textClass[0] == undefined) {
        return
      }
      const currentTime = textClass[0].innerText.split('\n')[0]

      let buttonSelector = belowId.querySelector('button')

      if (subtitle[currentTime] !== undefined) {
        currentTag.innerText = subtitle[currentTime][0]
        const prevTimeIndex = timeArray.indexOf(currentTime) - 1
        const nextTimeIndex = timeArray.indexOf(currentTime) + 1
        if (prevTimeIndex < 0 || timeArray[prevTimeIndex] == '0:00') {
          prevTextTag.innerText = ''
        } else {
          prevTextTag.innerText = subtitle[timeArray[prevTimeIndex]][0]
        }

        if (nextTimeIndex > timeArray.length - 1) {
          nextTextTag.innerText = ''
        } else {
          nextTextTag.innerText = subtitle[timeArray[nextTimeIndex]][0]
        }

        if (subtitle[currentTime][1] !== undefined) {
          const emotionValue = subtitle[currentTime][1]
          if (emotionValue > 70) {
            currentTag.style.fontSize = '20px'
            currentTag.style.color = 'black'
            console.log('긍정', emotionValue)
            currentTag.style.color = 'blue'
          } else if (emotionValue < 30) {
            currentTag.style.fontSize = '20px'
            currentTag.style.color = 'black'
            console.log('부정', emotionValue)
            currentTag.style.color = 'red'
          } else {
            console.log('중립', emotionValue)
            currentTag.style.fontSize = '20px'
            currentTag.style.color = 'black'
          }
        }
      } else {
        let prevTime
        for (const key in subtitle) {
          // 비디오 시간과 자막시간을 비교하기 위함
          let subitlteTime = Number(key.split(':').join(''))
          let videoTime = Number(currentTime.split(':').join(''))
          if (subitlteTime > videoTime) {
            currentTag.innerText = subtitle[prevTime][0]
          } else {
            prevTime = key
          }
        }
      }
    }

    // 3. 옵저버 인스턴스 생성
    const observer = new MutationObserver(callback) // 타겟에 변화가 일어나면 콜백함수를 실행하게 된다.
    const testObserver = new MutationObserver(testCallback)

    // 4. DOM의 어떤 부분을 감시할지를 옵션 설정
    const config = {
      childList: true, // 타겟의 하위 요소 추가 및 제거 감지
      attributes: true, // 타켓의 속성 변경를 감지
      characterData: true, // 타겟의 데이터 변경 감지
      subtree: true, // 타겟의 자식 노드 아래로도 모두 감지
      attributeOldValue: false, // 타겟의 속성 변경 전 속성 기록
      characterDataOldValue: false, // 타겟의 데이터 변경 전 데이터 기록
    }

    // 5. 감지 시작
    if (target != null) {
      clearInterval(startMutation)
      alert('자막 생성을 시작합니다.')
      var belowId = document.getElementById('below')

      // 자막박스 추가
      var subtitleBoxTag = document.createElement('button')
      subtitleBoxTag.style.width = '100%'
      subtitleBoxTag.style.minHeight = '50px'
      subtitleBoxTag.style.border = '1px solid blue'
      subtitleBoxTag.style.fontSize = '20px'
      subtitleBoxTag.id = 'subtitleBox'
      belowId.prepend(subtitleBoxTag)

      // 자막박스에 텍스트 추가
      let subtitleBoxTagSelector = belowId.querySelector('button')
      var currentTag = document.createElement('div')
      var prevTextTag = document.createElement('div')
      var nextTextTag = document.createElement('div')
      prevTextTag.id = 'prevTextTag'
      currentTag.id = 'currentTag'
      nextTextTag.id = 'nextTextTag'

      currentTag.style.fontSize = '20px'
      prevTextTag.style.fontSize = '15px'
      nextTextTag.style.fontSize = '15px'

      prevTextTag.style.color = 'grey'
      nextTextTag.style.color = 'grey'
      subtitleBoxTagSelector.prepend(nextTextTag)
      subtitleBoxTagSelector.prepend(currentTag)
      subtitleBoxTagSelector.prepend(prevTextTag)

      // observer.observe(target, config)
      testObserver.observe(target, config)
    }
  }

  // 3초 간격으로 감지시작, 감지가 시작되면 요청 중지
  const startMutation = setInterval(() => {
    console.log('start')
    mutation()
  }, 3000)
}

const openScript = async () => {
  const scriptPrviousDOM = document
    .querySelector('#menu.ytd-watch-metadata')
    .querySelectorAll('.yt-spec-touch-feedback-shape--touch-response')

  await scriptPrviousDOM[scriptPrviousDOM.length - 1].click()

  const scriptDOM = document.querySelectorAll('yt-formatted-string.ytd-menu-service-item-renderer')
  await scriptDOM[scriptDOM.length - 1].click()

  await scriptPrviousDOM[scriptPrviousDOM.length - 1].click()

  main()
}

setTimeout(() => {
  console.log('test')
  openScript()
}, 5000)

export default main
printLine("Using the 'printLine' function from the Print Module")
