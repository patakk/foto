from flask import Flask
from flask import render_template
import base64
import requests

app = Flask(__name__)


@app.route("/")
def hello():
    return render_template('index.html')


if __name__ == "__main__":
    app.run("0.0.0.0", port=5005)