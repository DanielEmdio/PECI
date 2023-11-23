from flask import Flask, render_template, send_from_directory, request
import os
from utils import *
import json
import random
import string

app = Flask(__name__, static_url_path='', static_folder='static')

@app.route('/html/<path:filename>')
def serve_html(filename):
    return send_from_directory('static/html', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('static/js', filename)

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('static/css', filename)

@app.route('/img/<path:filename>')
def serve_img(filename):
    return send_from_directory('static/img', filename)

@app.route('/favicon.ico')
def serve_favicon():
    return send_from_directory('static/img/html', 'icon.ico')

"""# Route to display videos for a user
@app.route('/user_videos/<username>')
def user_videos(username):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Fetch non-restricted videos for the specified user
    cursor.execute("SELECT video FROM PTs WHERE user = ? AND restrictedVideo = 0", (username,))

    videos = cursor.fetchall()
    conn.close()
    ##
    return render_template('videos.html', username=username, videos=videos)

"""

@app.route('/post')
def exibir_video():
    video_path = get_video_path_from_database('user1')  # Obtém o caminho do vídeo do banco de dados
    return render_template('post.html', video_path=video_path)       

@app.route('/auth', methods=['POST' , 'GET'])
def auth():
    username = request.form.get("username")
    password = request.form.get("password")

    result = {"authentication": "INVALID", "token": ""}
    if login(username, password):
        result["authentication"] = "OK"
        result["token"] = ''.join(random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(10))
        setToken(username, result["token"])
        return json.dumps(result)
    else:
        return json.dumps(result)

@app.route('/valid', methods=['POST' , 'GET'])
def valid():
    token = request.form.get("token")
    if validToken(token):
        return json.dumps({"tokenIsValid": "VALID"})
    else:
        return json.dumps({"tokenIsValid": "INVALID"})

'''@app.route('/logout')
def logOut(self, token=None):
    if (deleteToken(token)):
        return json.dumps({"deleted": "YES"})
    else:
        return json.dumps({"deleted": "NO"})
'''

@app.route('/')
def blogHome():
    return render_template('index.html')

@app.route('/login')
def loginSign():
    return render_template('login.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/post')
def post():
    return render_template('post.html')

@app.route('/user_video')
def user_video():
    username = 'user1'  # Change this to the desired username
    videos = get_video_path_from_database(username)
    print("--------------------------------")
    print(videos)
    return render_template('user_videos.html', username=username, videos=videos)
    return render_template('user_video.html')

if __name__ == '__main__':
    app.run(debug=True)
