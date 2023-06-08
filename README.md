# CCC - 보기쉬운 유튜브 자동자막 제공 서비스 

<img width="172" alt="image" src="https://github.com/YesHyeon/Youtube-Sub-Maker/assets/81014501/7f3cd3da-afcd-4de0-afaa-b4bab379c720">


<br/>

유튜브 자동자막을 재가공하여 보기쉽고 유의미한 자막을 제공하는 크롬 익스텐션 서비스 입니다.

# 👨🏻‍💻 기술스택

- Chrome extension
- React
- Javascript
- Vite
- Python
- Flask

# 📜 프로젝트 목표 및 기대효과
- 자동자막의 배치를 다르게 구성하여 보기 쉬운 자동자막을 제공함<br/>
- 영상을 가리지 않는 적절한 위치에서 사용자의 영상시청 경험을 높일 수 있음 <br/>
- 문장 단위로 자막을 재구성하여, 유의미한 자막을 제공함<br/>
- 추후 자막의 텍스트를 분석하기에 용이하고 정보전달력을 높임
- 텍스트 감성분석을 통해 풍성한 자막 사용경험을 제공함
- 크롬 익스텐션 서비스를 사용해 누구나 쉽게 사용할 수 있도록 함

# 💿 프로젝트 구현순서
1) 크롬 익스텐션 프론트엔드 (React) 구축
2) DOM을 조작해 자동자막을 영상 밑에 배치
3) 백엔드 서버 구축 (Flask)
4) 형태소 분석을 통해 문장으로 재구성
5) 재구성한 문장 감성분석 진행 (Positive, Negative)
6) 문장구성 + 감성분석 결과를 토대로 재구성한 자막 제공





<br/>

# ASIS
<div margin='20'>
<img width="740" alt="image" src="https://github.com/YesHyeon/Youtube-Sub-Maker/assets/81014501/a3049b75-06ac-4697-884d-46c28190f01e">
<br/>
<img width="740" alt="image" src="https://github.com/YesHyeon/Youtube-Sub-Maker/assets/81014501/c491485b-51b5-47e3-aff9-696b26b18f7e">
</div>

***

- 유튜브 자동자막을 사용할 때 한 줄에 자막이 제공되지 않고, 끊어서 나오는 문제점 <br/>
- 자막이 길어질 때 정렬이 되어있지 않아 영상시청을 방해하는 문제점
- 검은 배경, 흰 글자 스타일이 고정되어 있는 문제점

<br/>

# TOBE
<br/>

<div margin='20'>
<img width="748" alt="image" src="https://github.com/YesHyeon/Youtube-Sub-Maker/assets/81014501/98e7d85f-eae8-4e0a-8193-bb8a1859e5e1">
<br/>
<img width="748" alt="image" src="https://github.com/YesHyeon/Youtube-Sub-Maker/assets/81014501/6ae2b7ef-e2fc-460f-bbc4-d70ce61856f2">
</div>

***

 - 자동자막을 사용할 때 영상 하단에 자막을 배치하여 영상시청에 방해가 되지않도록 하였고, 한 줄로 보기쉽게 표현
 - 이전 자막과 다음 자막을 같이 표시하여, 유저의 자막 사용경험을 높임 <br/>

***

<img width="380" alt="image" src="https://github.com/YesHyeon/Youtube-Sub-Maker/assets/81014501/6240674f-186a-438d-bf58-e1fdbf306e25">
<img width="814" alt="image" src="https://github.com/YesHyeon/Youtube-Sub-Maker/assets/81014501/15489270-0d11-4a19-a759-d4add05af908">

***
 현재는 자막의 음성의 주파수를 분석하여 인터랙티브한 자막 제공기능을 개발하고 있습니다.
 
 

