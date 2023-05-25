from flask import Flask, request, jsonify # Flask
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import SRTFormatter
# from kss import split_sentences

import sys

app = Flask(__name__)

@app.route('/users')
def users():
	# users 데이터를 Json 형식으로 반환한다
    return {"members": [{ "id" : 1, "name" : "yerin" },
    					{ "id" : 2, "name" : "dalkong" }]}
           
@app.route('/url')
def urls():
    # user = request.get_json()#json 데이터를 받아옴
    return 'good';# 받아온 데이터를 다시 전송
    
@app.route('/subtitle', methods=['POST'])    
def get_youtube_subtitle():
    url = request.json;
    print('url',url);
    transcript = YouTubeTranscriptApi.get_transcript(url['url'], languages=['de', 'ko']);
    formatter = SRTFormatter();
    srt_formatted = formatter.format_transcript(transcript);
    
    textArray = [];
    textItem = ' ';
    start = "0";
    
    for i in transcript:
        if len(textItem) > 30:
            분 = int(start) / 60;
            초 = int(start) % 60;
            start = str(int(분)) + ':' + str(초).zfill(2);
            textArray.append([textItem, start]);
            textItem = i['text']; # 텍스트 초기화
            start = i['start']; # 시작시간 초기화
        else :
            textItem = textItem +' '+ i['text'];

    print('textArray',textArray);
    return 'complete';


if __name__ == "__main__":
    app.run(debug = True, port=5002);

