from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

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
