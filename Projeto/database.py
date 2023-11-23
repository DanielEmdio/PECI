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


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index')
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



if __name__ == '__main__':
    app.run(debug=True)
