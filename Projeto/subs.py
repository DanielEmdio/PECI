from flask import Flask, render_template, session
import sqlite3

app = Flask(__name__)
db_path = 'PECI/Projeto/database.db'

@app.route('/dashboard')
def dashboard():
    user_id = session.get('user_id')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM User WHERE id=?", (user_id,))
    user = cursor.fetchone()

    print(user)

    pt = user[3]


    if pt != 0:
        if pt[4] == 0:
            # ...
            return render_template('page_that_shows.html')
        else:
            # ...
            return render_template('page_that_doesnt.html')
