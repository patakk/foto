import base64
import requests
from flask import Flask, render_template, request, \
                  Response, send_file, redirect, url_for, make_response, jsonify
import uuid
import shutil
import os
import re
import glob
import json

app = Flask(__name__)
application = app

@app.route('/save_info', methods=['GET', 'POST'])
def save_info():
    if request.method == 'POST':

        userName = request.values['userName']
        rollName = request.values['rollName']
        filmName = request.values['filmName']
            
        userDir = './static/{}'.format(userName)
        rollDir = './static/{}/{}'.format(userName, rollName)
        
        if not os.path.exists(userDir):
            os.makedirs(userDir)
        if not os.path.exists(rollDir):
            os.makedirs(rollDir)
        
        frames = os.listdir(rollDir)
        nframes = len(frames)

        data = {
            'film': filmName,
            'iso': 400,
            'speed': "1/125",
            'aperture': "f/1.4"
        }

        with open(os.path.join(rollDir, '{}.json'.format(nframes)), 'w') as f:
            json.dump(data, f)   
        
        image_b64 = request.values['image']
        imgstr = re.search(r'data:image/png;base64,(.*)',image_b64).group(1)
        decoded = base64.b64decode(imgstr)
        with open(os.path.join(rollDir, '{}.png'.format(nframes)), 'wb') as f:
            f.write(decoded) 

        return jsonify({'name': './static/output.pnga', 'w': 111, 'h': 222})


@app.route("/")
def hello():
    return render_template('index.html')


if __name__ == "__main__":
    app.run("0.0.0.0", port=5005)
