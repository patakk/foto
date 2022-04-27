import base64
import requests
from flask import Flask, render_template, request, \
                  Response, send_file, redirect, url_for, make_response, jsonify
import uuid
import shutil
import os
import glob

app = Flask(__name__)
application = app

@app.route('/save_info', methods=['GET', 'POST'])
def save_info():
    if request.method == 'POST':
        image = request.values['image']
        with open("./static/aaaa.png", "wb") as f:
            f.write(base64.decodebytes(image))
        return jsonify({'name': image, 'w': 111, 'h': 222})


@app.route("/")
def hello():
    return render_template('index.html')


if __name__ == "__main__":
    app.run("0.0.0.0", port=5005)
