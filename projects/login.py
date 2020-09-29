#!/usr/local/bin/python3

from cgitb import enable

enable()

from cgi import FieldStorage
from html import escape
from hashlib import sha256
from time import time
from shelve import open
from http.cookies import SimpleCookie
import pymysql as db

form_data = FieldStorage()
username = ''
result = ''
if len(form_data) != 0:
    username = escape(form_data.getfirst('username', '').strip())
    password = escape(form_data.getfirst('password', '').strip())
    if not username or not password:
        result = '<p>User name and password are required</p>'
    else:
        sha256_password = sha256(password.encode()).hexdigest()
        try:
            connection = db.connect('', '', '', '')
            cursor = connection.cursor(db.cursors.DictCursor)
            cursor.execute("""SELECT * FROM users 
                              WHERE username = %s
                              AND password = %s""", (username, sha256_password))
            if cursor.rowcount == 0:
                result = '<p>You entered an incorrect user name or password</p>'
            else:
                cookie = SimpleCookie()
                sid = sha256(repr(time()).encode()).hexdigest()
                cookie['sid'] = sid
                session_store = open('sess_' + sid, writeback=True)
                session_store['authenticated'] = True
                session_store['username'] = username
                session_store.close()
                result = """
                   <p>You have logged in.</p>
                   <p>Welcome back to Cave crawler.</p>
                   <ul>
                       <li><a href="game.py">Cave Crawler</a></li> 
                       <li><a href="leaderboard.py">Leaderboard</a></li>
                       <li><a href="logout.py">Logout</a></li>
                   </ul>"""
                print(cookie)
            cursor.close()
            connection.close()
        except (db.Error, IOError):
            result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'

print('Content-Type: text/html')
print()
print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>Cave Crawler &#124; Log in</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <h1>Cave Crawler</h1>
            </header>
            <main>
                <h1>Log In:</h1>
                <form action="login.py" method="post">
                    <label for="username">User name: </label>
                    <input type="text" name="username" id="username" value="%s" />
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password" />
                    <input type="submit" value="Login" />
                </form>
                <p>Use the above boxes to type in your username and password.</p>
                <p><a href="instructions.html">Game Instructions </a><a href="register.py"> Register</a></p>
                
                %s
            </main>
            <footer>
                <small>&copy; Jake Mulley </small>
                <a href="#header">Back To The Top</a>
            </footer>
        </body>
    </html>""" % (username, result))
