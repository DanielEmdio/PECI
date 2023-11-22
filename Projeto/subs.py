from flask import Flask, render_template, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///PECI/Projeto/database.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100), unique=True)
    video = db.Column(db.String(100), unique=True)
    restrictedVideo = db.Column(db.Integer, primary_key=True)

@app.route('/dashboard')
def dashboard():
    user_id = session.get('user_id')
    user = User.query.get(user_id)

    if user.username == 'PT1':
        return render_template('subscribed_dashboard.html')
    else:
        return render_template('not_subscribed_dashboard.html')
