from flask import Flask, make_response, jsonify, request
import requests
from werkzeug.utils import secure_filename
import os
# ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/file/upload", methods=['POST'])
def upload_file():
    if request.method == 'POST':
        uploaded_files = request.files.getlist("file")
        if not os.path.exists(f'./storedFiles'):
            os.makedirs(f'./storedFiles')
        for file in uploaded_files:
            file.save(f'./storedFiles/{secure_filename(file.filename)}')

    return make_response("file uploaded", 200)


@app.route("/api/file/files", methods=['GET'])
def get_files():
    response_data = []
    files_path = './storedFiles'
    if request.method == 'GET':
        files = os.listdir(files_path)
        for file in range(len(files)):
            response_data.append({'name': files[file]})
    return make_response(jsonify(response_data)), 200


if __name__ == ('__main__'):
    app.run(debug=True)
