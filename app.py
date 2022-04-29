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
from PIL import Image
  
app = Flask(__name__)
application = app

@app.route('/save_info', methods=['GET', 'POST'])
def save_info():
    if request.method == 'POST':

        userName = request.values['userName']
        rollName = request.values['rollName']
        filmName = request.values['filmName']
        isoValue = request.values['isoValue']
        apertureValue = request.values['apertureValue']
        shutterValue = request.values['shutterValue']
            
        userDir = './static/database/{}'.format(userName)
        rollDir = './static/database/{}/{}'.format(userName, rollName)
        
        if not os.path.exists('./static/database'):
            os.makedirs('./static/database')
        if not os.path.exists(userDir):
            os.makedirs(userDir)
        if not os.path.exists(rollDir):
            os.makedirs(rollDir)
        
        frames = glob.glob(os.path.join(rollDir, '*.png'))
        nframes = len(frames)

        data = {
            'film': filmName,
            'iso': isoValue,
            'speed': shutterValue,
            'aperture': apertureValue
        }

        jsonPath = os.path.join(rollDir, '{}.json'.format(nframes))
        with open(jsonPath, 'w') as f:
            f.write(json.dumps(data, indent=4)) 
        
        image_b64 = request.values['image']
        imgstr = re.search(r'data:image/png;base64,(.*)',image_b64).group(1)
        decoded = base64.b64decode(imgstr)
        imagePath = os.path.join(rollDir, '{}.png'.format(nframes))
        with open(imagePath, 'wb') as f:
            f.write(decoded)

        # open method used to open different extension image file
        im = Image.open(imagePath)  
        width, height = im.size
        newsize = (width, int(width*3/4))
        im = im.resize(newsize)
        im = im.save(imagePath)

        #return jsonify({'name': './static/output.pnga', 'w': 111, 'h': 222})
        return jsonify({'message': 'SUCCESS'})

@app.route("/")
def hello():
    return render_template('init.html')
    
@app.route("/session", methods=['GET', 'POST'])
def session():
    return render_template('session.html')
    
@app.route("/preview", methods=['GET', 'POST'])
def preview():
    return render_template('preview.html')
    

@app.route("/previewRolls", methods=['GET', 'POST'])
def previewRolls():
    if request.method == 'GET':
        if 'rollName' in request.values:
            userName = request.values['userName']
            rollName = request.values['rollName']
            rollDir = './static/database/{}/{}'.format(userName, rollName)
            if not os.path.exists(rollDir):
                return render_template('preview.html')
            frames = glob.glob(os.path.join(rollDir, '*.json'))
            frames = [json.load(open(frame)) for frame in frames]
            films = [frame['film'] for frame in frames]
            isos = [frame['iso'] for frame in frames]
            speeds = [frame['speed'] for frame in frames]
            apertures = [frame['aperture'] for frame in frames]
            return render_template('roll.html', nframes=len(frames), films=films, isos=isos, speeds=speeds, apertures=apertures)
        else:
            userName = request.values['userName']
            userDir = './static/database/{}'.format(userName)
            if not os.path.exists(userDir):
                return render_template('preview.html')
            rolls = os.listdir(userDir)
            return render_template('previewRolls.html', rollslen=len(rolls), rolls=rolls)

    return render_template('preview.html')
 


if __name__ == "__main__":
    app.run("0.0.0.0", port=5005)
