from flask import Flask # Flask

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

if __name__ == "__main__":
    app.run(debug = True, port=5002)

    