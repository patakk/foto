import base64
import requests
from flask import Flask, render_template, request, \
                  Response, send_file, redirect, url_for, make_response, jsonify
import numpy as np
import uuid
import cv2
import requests
import shutil
import os
import glob

app = Flask(__name__)
application = app

@app.route("/")
def hello():
    return render_template('index.html')


if __name__ == "__main__":
    app.run("0.0.0.0", port=5005)
