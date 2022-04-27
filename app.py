import base64
import requests
from flask import Flask, render_template, request, \
                  Response, send_file, redirect, url_for, make_response, jsonify
import uuid
import shutil
import os
import re
import glob

app = Flask(__name__)
application = app

@app.route('/save_info', methods=['GET', 'POST'])
def save_info():
    if request.method == 'POST':
        image_b64 = request.values['image']
        imgstr = re.search(r'data:image/png;base64,(.*)',image_b64).group(1)
        decoded = base64.b64decode(imgstr)
        #with open('./static/output.png', 'wb') as f:
        #    f.write(decoded)
        return jsonify({'name': './static/output.pngaaaaa', 'w': 111, 'h': 222})


@app.route("/")
def hello():
    return render_template('index.html')


if __name__ == "__main__":
    app.run("0.0.0.0", port=5005)
