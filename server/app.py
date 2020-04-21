from datetime import datetime
from bson.json_util import dumps

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/barker'
mongo = PyMongo(app)
barks = mongo.db.barks

def isValid(bark):
    return bark['name'] and bark['name'].strip() != '' and \
        bark['content'] and bark['content'].strip() != ''

@app.route('/')
def bark():
    return {"message":"bark bark"}

@app.route('/barks',methods=['POST','GET'])
def post_req():
    if request.method == 'POST':
        if isValid(request.json):
            # add in to database
            bark = {"name":request.json['name'], "content":request.json['content'],"date":datetime.now()}
            barks.insert(bark)
            print(bark)
            return dumps(bark)
        else:
            response = {"message":"Name and content are required."}
            return response, 422
    return jsonify(dumps(list(barks.find())))


if __name__ == '__main__':
	app.run()

