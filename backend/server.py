from flask import Flask, request, jsonify # Flask
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import SRTFormatter
from mecab import MeCab

import numpy as np
import pandas as pd
import re
import json
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import tensorflow as tf
from tensorflow.keras import layers
import pickle
import keras

import sys

app = Flask(__name__)
mecab = MeCab()

model_name= 'cnn_classifier_kr'
DATA_PATH = 'model/CLEAN_DATA/'
INPUT_TRAIN_DATA = 'nsmc_train_input.npy'
LABEL_TRAIN_DATA = 'nsmc_train_label.npy'
DATA_CONFIGS = 'data_configs.json'

prepro_configs = json.load(open(DATA_PATH+DATA_CONFIGS,'r'))

kargs={'model_name': model_name, 'vocab_size':prepro_configs['vocab_size'],'embbeding_size':128, 'num_filters':100,'dropout_rate':0.5, 'hidden_dimension':250,'output_dimension':1}


class CNNClassifier(tf.keras.Model):
    def __init__(self, **kargs):
        super(CNNClassifier, self).__init__(name=kargs['model_name'])
        self.embedding = layers.Embedding(input_dim=kargs['vocab_size'], output_dim=kargs['embbeding_size'])
        self.conv_list = [layers.Conv1D(filters=kargs['num_filters'], kernel_size=kernel_size, padding='valid',activation = tf.keras.activations.relu,
                                        kernel_constraint = tf.keras.constraints.MaxNorm(max_value=3)) for kernel_size in [3,4,5]]
        self.pooling = layers.GlobalMaxPooling1D()
        self.dropout = layers.Dropout(kargs['dropout_rate'])
        self.fc1 = layers.Dense(units=kargs['hidden_dimension'],
                                activation = tf.keras.activations.relu,
                                kernel_constraint=tf.keras.constraints.MaxNorm(max_value=3.))
        self.fc2 = layers.Dense(units=kargs['output_dimension'],
                                activation=tf.keras.activations.sigmoid,
                                kernel_constraint= tf.keras.constraints.MaxNorm(max_value=3.))
        
    def call(self,x):
        x = self.embedding(x)
        x = self.dropout(x)
        x = tf.concat([self.pooling(conv(x)) for conv in self.conv_list], axis = 1)
        x = self.fc1(x)
        x = self.fc2(x)
        return x

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
    
    print(textArray)
    
    return jsonify({"textObj" : textObj});



    
@app.route('/emotional', methods=['POST'])    
def get_youtube_subtitle_emotional():
    
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
    
        # 감성분석 모델적용
        textEmotionalArray = [];
        okt = Okt()
        tokenizer  = Tokenizer()

        DATA_CONFIGS = 'data_configs.json'
        prepro_configs = json.load(open('model/CLEAN_DATA/'+DATA_CONFIGS,'r')) #TODO 데이터 경로 설정

        #TODO 데이터 경로 설정
        with open('model/CLEAN_DATA/tokenizer.pickle','rb') as handle:
            word_vocab = pickle.load(handle)

        prepro_configs['vocab'] = word_vocab

        tokenizer.fit_on_texts(word_vocab)

        MAX_LENGTH = 8 #문장최대길이

        for i in textArray:
                sentence = i[0]
                # if sentence == '끝':
                #     break
                sentence = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣\\s ]','', sentence)
                stopwords = ['은','는','이','가','하','아','것','들','의','있','되','수','보','주','등','한'] # 불용어 추가할 것이 있으면 이곳에 추가
                sentence = okt.morphs(sentence, stem=True) # 토큰화
                sentence = [word for word in sentence if not word in stopwords] # 불용어 제거
                vector  = tokenizer.texts_to_sequences(sentence)
                pad_new = pad_sequences(vector, maxlen = MAX_LENGTH) # 패딩

                #학습한 모델 불러오기
                model = keras.models.load_model('model/my_models/') #TODO 데이터 경로 설정
                model.load_weights('model/DATA_OUT/cnn_classifier_kr\weights.h5') #TODO 데이터 경로 설정
                predictions = model.predict(pad_new)
                predictions = float(predictions.squeeze(-1)[1])
                
                textEmotionalArray.append([textItem, start,predictions*100]);

                # if(predictions > 0.7):
                #     print(sentence);
                #     print(sentence);
                #     print("{:.2f}% 확률로 긍정 리뷰입니다.\n".format(predictions * 100))
                # elif (predictions < 0.3):
                #     print(sentence);
                #     print("{:.2f}% 확률로 부정 리뷰입니다.\n".format((1 - predictions) * 100))
                # else :
                #     print(predictions)
                #     print('중립리뷰입니다.')
        
        return textEmotionalArray;


if __name__ == "__main__":
    app.run(debug = True, port=5002);

