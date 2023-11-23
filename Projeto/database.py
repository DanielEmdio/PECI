from flask import Flask, render_template, send_from_directory, session
import sqlite3
import os

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

# Function to fetch non-restricted videos for a user
def get_non_restricted_videos(username):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Fetch non-restricted videos for the specified user
    cursor.execute("SELECT video FROM PTs WHERE user = ? AND restrictedVideo = 0", (username,))

    videos = cursor.fetchall()
    conn.close()
    return videos

# Route to display videos for a user
@app.route('/user_videos/<username>')
def user_videos(username):
    videos = get_non_restricted_videos(username)
    return render_template('videos.html', username=username, videos=videos)



@app.route('/post')
def exibir_video():
    video_path = get_video_path_from_database('user1')  # Obtém o caminho do vídeo do banco de dados
    return render_template('post.html', video_path=video_path)

def get_video_path_from_database(username):
    
    #video_path = "video/wheat-field.mp4"  
    
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT PTid FROM Users WHERE user = ?", (username,))
    PTid = cursor.fetchone()
    #print(PTid)
    if PTid is None:
        video_path = "nothing"
    else:
        cursor.execute("SELECT video FROM PTs WHERE Id = ?", (PTid[0],))
        video_path = cursor.fetchone()[0]

    conn.close()
    return video_path

@app.route('/dashboard')
def dashboard():
    user_id = 1
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Users WHERE Id=?", (user_id,))
    user = cursor.fetchone()
    ptId = user[3]

    if ptId != 0:
        cursor.execute("SELECT * FROM PTs WHERE Id=?", (ptId,))
        pt = cursor.fetchone()
        if pt[4] == 0:
            # ...
            return render_template('post.html', video_path="./video/wheat-field.mp4")
        else:
            # ...
            return render_template('page_that_doesnt.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def blogHome():
    return render_template('index.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/post.html')
def post():
    return render_template('post.html')

@app.route('/user_video')
def user_video():
    return render_template('user_video.html')


if __name__ == '__main__':
    app.run(debug=True)