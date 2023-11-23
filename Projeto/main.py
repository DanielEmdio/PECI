from flask import Flask, render_template, send_from_directory
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

def get_video_path_from_database(username):
    
    #video_path = "video/wheat-field.mp4"  
    
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT PTid FROM Users WHERE user = ?", (username,))
    PTid = cursor.fetchone()    #id do PT em que está inscrito
    print("--------------------------------")
    print(PTid)
    #print(PTid)
    #if PTid is None:
    videos_paths = cursor.execute("SELECT video FROM PTs WHERE restrictedVideo=0")
    videos_paths = [video[0] for video in cursor.fetchall()]
    if PTid[0]!= None:
        PTname = cursor.execute("SELECT user FROM PTs WHERE Id = ?", (PTid[0],)).fetchone()[0]
        
        cursor.execute("SELECT video FROM PTs WHERE user = ? AND restrictedVideo=1", (PTname,))
        videos_paths += [video[0] for video in cursor.fetchall()]

    conn.close()
    return videos_paths


@app.route('/')
def blogHome():
    return render_template('index.html')

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