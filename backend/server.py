from flask import Flask, request # Flask
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import SRTFormatter

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
    fileName = request.form.get('fileName');
    print('email',fileName);
    transcript = YouTubeTranscriptApi.get_transcript("KA78LmDnxJA", languages=['de', 'ko']);
    formatter = SRTFormatter();
    srt_formatted = formatter.format_transcript(transcript);
    # print(srt_formatted);
    return 'd';


if __name__ == "__main__":
    app.run(debug = True, port=5002);
