from flask import Flask, make_response, jsonify
import requests

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/posts", methods=['GET'])
def get_posts():
    url = 'https://jsonplaceholder.typicode.com/posts'
    response = requests.get(url)
    response_data = response.json()
    return make_response(response_data, 200)


@app.route("/api/posts/<string:id>", methods=['GET'])
def get_post(id):
    url = f'https://jsonplaceholder.typicode.com/posts/{id}'
    response = requests.get(url)
    response_data = response.json()
    return make_response(response_data, 200)


if __name__ == ('__main__'):
    app.run(debug=True)
