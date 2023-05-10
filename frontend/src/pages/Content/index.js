import { printLine } from './modules/print';
import axios from 'axios';

// window.addEventListener('unload', () => {
//   console.log('--');
// });

setTimeout(() => {
  openScript();
}, 3000);

const openScript = async () => {
  const scriptPrviousDOM = document
    .querySelector('#menu.ytd-watch-metadata')
    .querySelectorAll('.yt-spec-touch-feedback-shape--touch-response');

  await scriptPrviousDOM[scriptPrviousDOM.length - 1].click();

  const scriptDOM = document.querySelectorAll(
    'yt-formatted-string.ytd-menu-service-item-renderer'
  );
  await scriptDOM[scriptDOM.length - 1].click();

  await scriptPrviousDOM[scriptPrviousDOM.length - 1].click();

  main();
};

const createBox = () => {
  // 테스트용
  const subArray = {
    '0:01': ['positive', 67],
    '0:11': ['negative', 80],
    '0:21': [null, null],
  };

  // 스크립트 자막 인식
  const textClass = document
    .querySelector('#body.ytd-transcript-search-panel-renderer')
    .getElementsByClassName(
      'style-scope ytd-transcript-segment-list-renderer active'
    );

  // 엔터를 기준으로 시간과 자막 분리하기
  const timeIndex = textClass[0].innerText.split('\n')[0];
  const subtitle = textClass[0].innerText.split('\n')[1];

  // 생성한 버튼 박스 DOM의 InnerText 수정하기.

  var belowId = document.getElementById('below');
  var buttonSelector = belowId.querySelector('button');

  if (Object.keys(subArray).includes(timeIndex)) {
    //버튼에 스타일을 주고 난 후에 다음꺼는 어떻게 초기화 시킬까?
    buttonSelector.style.color = 'red';
    buttonSelector.style.animation = 'vibration 0.1s infinite';
  } else {
    buttonSelector.style.color = 'black';
  }

  buttonSelector.innerText = subtitle;
};

const main = () => {
  const mutation = async () => {
    const target = document.querySelector(
      '#body.ytd-transcript-search-panel-renderer'
    );

    // 2. 옵저버 콜백 생성
    const callback = (mutationList, observer) => {
      createBox();
    };

    // 3. 옵저버 인스턴스 생성
    const observer = new MutationObserver(callback); // 타겟에 변화가 일어나면 콜백함수를 실행하게 된다.

    // 4. DOM의 어떤 부분을 감시할지를 옵션 설정
    const config = {
      childList: true, // 타겟의 하위 요소 추가 및 제거 감지
      attributes: true, // 타켓의 속성 변경를 감지
      characterData: true, // 타겟의 데이터 변경 감지
      subtree: true, // 타겟의 자식 노드 아래로도 모두 감지
      attributeOldValue: false, // 타겟의 속성 변경 전 속성 기록
      characterDataOldValue: false, // 타겟의 데이터 변경 전 데이터 기록
    };

    // 5. 감지 시작
    if (target != null) {
      clearInterval(startMutation);
      alert('자막 생성을 시작합니다.');
      // 버튼 박스생성
      var belowId = document.getElementById('below');
      var button = document.createElement('button');
      button.style.width = '100%';
      button.style.height = '50px';
      button.style.border = '1px solid blue';
      button.style.fontSize = '20px';

      // 버튼 박스 DOM 추가
      belowId.prepend(button);

      observer.observe(target, config);
    }
  };

  const startMutation = setInterval(() => {
    console.log('start');
    mutation();
  });
};

export default main;
printLine("Using the 'printLine' function from the Print Module");
