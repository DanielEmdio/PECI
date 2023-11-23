import sqlite3 as sql

def get_video_path_from_database(username):
    conn = sql.connect('database.db')
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

def signin(nome, password):
    
    db = sql.connect("database.db")
    print("nome: ", nome)
    print("password: ", password)
    #user = db.execute("SELECT * FROM Users WHERE user = ?", (nome,)).fetchall()
    #if len(user) != 0:
    #    db.close()
    #    return (False, "User already exists.")

    # Encrypt password with sha256, using the hashlib library, so that the password is not stored in plain text
    # password = hashlib.sha256(password.encode()).hexdigest()
    
    # Check if the password was encrypted correctly
    #print(password)
    cursor = db.cursor()
    cursor.execute("INSERT INTO Users(user,password) VALUES(?, ?)", (nome, password))
    db.commit()
    db.close()
    return (True, "")

def login(nome, password):
    db = sql.connect("database.db")    
    user = db.execute("SELECT * FROM Users WHERE user = ? AND password = ?", (nome, password)).fetchall()
    if len(user) == 0:
        db.close()
        return False

    db.close()
    return True

def setToken(nome, token):
    db = sql.connect("database.db")
    cursor = db.cursor()
    cursor.execute("UPDATE Users SET token = ? WHERE user = ?;", (token, nome))
    db.commit()
    db.close()

def validToken(token):
    db = sql.connect("database.db")
    user = db.execute("SELECT * FROM Users WHERE token = ?", (token,)).fetchall()
    if len(user) == 0:
        db.close()
        return False
    db.close()
    return True

def deleteToken(token):
    if validToken(token):
        db = sql.connect("database.db")
        cursor = db.cursor()
        cursor.execute("UPDATE Users SET token = '' WHERE token = ?", (token,))
        db.commit()
        db.close()
        return True
    else:
        return False
