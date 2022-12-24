from flask import Flask, make_response, jsonify, request, send_file, send_from_directory
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

        if not os.path.exists(f'./storedFiles'):
            response_data.append(
                {'name': "No stored files", 'isSuccessful': False})
            return make_response(response_data, 200)

        files = os.listdir(files_path)
        for file in range(len(files)):
            response_data.append({'name': files[file], 'isSuccessful': True})
    return make_response(jsonify(response_data)), 200


@app.route("/api/file/delete", methods=["POST"])
def delete_file():
    response_data = []
    files_path = './storedFiles'
    if request.method == 'POST':
        file_name_to_delete = request.json
        if not os.path.exists(files_path):
            response_data.append(
                {'message': "File not found", "isSuccessful": False})
            return make_response(response_data, 400)
        files = os.listdir(files_path)
        if file_name_to_delete["name"] in files:
            try:
                os.remove(f'{files_path}/{file_name_to_delete["name"]}')
                response_data.append(
                    {"message": f'{file_name_to_delete["name"]} deleted', "isSuccessful": True})
                return make_response(jsonify(response_data, 200))
            except:
                response_data.append(
                    {"message": 'Error deleting file', "isSuccessful": False})
                return make_response(jsonify(response_data, 400))


@app.route("/api/file/<string:fileName>", methods=["GET"])
def get_file(fileName):
    response_data = []
    files_path = './storedFiles'
    if not os.path.exists(files_path):
        response_data.append(
            {"message": "File not found", "isSuccessful": False})
        return make_response(response_data, 400)
    files = os.listdir(files_path)
    if fileName not in files:
        response_data.append(
            {"message": "File not found", "isSuccessful": False})
        return make_response(response_data, 400)
    return send_from_directory(files_path, fileName, as_attachment=True)


if __name__ == ('__main__'):
    app.run(debug=True)
