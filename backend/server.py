from flask import Flask, request, jsonify # Flask
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import SRTFormatter
from mecab import MeCab
# from kss import split_sentences

import sys

app = Flask(__name__)
mecab = MeCab()

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
    textItem = '.';
    start = "0";
    
    textObj = {};
    
    for i in transcript:
        mecabKo = mecab.pos(textItem);
        if ''.join(mecabKo[-1]).find('EC') > 0 or ''.join(mecabKo[-1]).find('EF') > 0 :
            분 = int(start) / 60;
            초 = int(start) % 60;
            start = str(int(분)) + ':' + str(초).zfill(2);
            if ''.join(mecabKo[-1]).find('EF') or ''.join(mecabKo[-1]).find('+EC') > 0 :
                textObj[start] = textItem + '.';
            else :
                textObj[start] = textItem + ',';
            textArray.append([textItem, start]);
            textItem = i['text']; # 텍스트 초기화
            start = i['start']; # 시작시간 초기화
        else :
            if i['text'] == '[음악]':
                textItem = textItem +' '+ '🎶';
            elif i['text'] == '[웃음]':
                textItem = textItem +' '+ '😆'; 
            else: 
                textItem = textItem +' '+ i['text'] ;
                
    # 끝에 적용되지 않는 부분 적용하기
    분 = int(start) / 60;
    초 = int(start) % 60;
    start = str(int(분)) + ':' + str(초).zfill(2);
    
    textObj[start] = textItem ;
 
    return jsonify({"textObj" : textObj});


if __name__ == "__main__":
    app.run(debug = True, port=5002);

