from flask import Flask, render_template

app = Flask(__name__)

# Sample data (replace this with your actual data from the database)
users = [
    {'username': 'user1', 'email': 'user1@example.com'},
    {'username': 'user2', 'email': 'user2@example.com'},
    {'username': 'user3', 'email': 'user3@example.com'}
]

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route to display a list of users
@app.route('/users')
def user_list():
    return render_template('users.html', users=users)

if __name__ == '__main__':
    app.run(debug=True)
