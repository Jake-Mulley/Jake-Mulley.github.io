#!/usr/local/bin/python3

from cgitb import enable

enable()

from cgi import FieldStorage
from html import escape
from os import environ
from shelve import open
from http.cookies import SimpleCookie
import pymysql as db

print('Content-Type: text/html')
print()

result = """
    <main>
        <h1>Please log in or register to view the leaderboard.</h1>
       <p>You do not have permission to access this page.</p>
       <ul>
           <li><a href="register.py">Register</a></li>
           <li><a href="login.py">Login</a></li>
       </ul>
   </main>"""

try:
    cookie = SimpleCookie()
    http_cookie_header = environ.get('HTTP_COOKIE')
    if http_cookie_header:
        cookie.load(http_cookie_header)
        if 'sid' in cookie:
            sid = cookie['sid'].value
            session_store = open('sess_' + sid, writeback=False)
            if session_store.get('authenticated'):
                connection = db.connect('', '', '', '')
                cursor = connection.cursor(db.cursors.DictCursor)
                cursor.execute('SELECT * FROM users ORDER BY highScore DESC')
                table = '<table><tr><th>Place</th><th>Name</th><th>Highscore</th></tr>'
                counter = 0
                for row in cursor.fetchall():
                    counter += 1
                    table += '<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (str(counter), row['username'], row['highScore'])
                table += '</table>'
                cursor.close()
                connection.close()
                result = """
                    <nav>
                            <a href="instructions.html">Instructions for this game</a>
                            <a href="">Leaderboard </a>
                            <a href="game.py">Cave Crawler </a>
                            <a href="logout.py">Log Out </a>
                    </nav>
                    <main>
                            <h1>Leaderboard</h1>
                            <p>The below table represents the users that have the highest score in the game of cave crawlers</p>
                            %s
                    </main>

                    """ % (table)
            session_store.close()
except IOError:
    result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'

print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>Cave Crawler &#124; Leaderboard</title>
            <link rel="stylesheet" href="styles.css">

        </head>
        <body>
            <header>
                <h1>Cave Crawler</h1>
            </header>
            
            %s
            <aside></aside>
            <footer>
                <small>&copy; Jake Mulley </small>
                <a href="#header">Back To The Top</a>
	        </footer>
        </body>
    </html>""" % (result))
