#!/usr/local/bin/python3

from cgitb import enable

enable()

from os import environ
from shelve import open
from http.cookies import SimpleCookie

print('Content-Type: text/html')
print()

result = """
   <main>
       <h1>Please log in or register to play the game.</h1>
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
                result = """
                <nav>
                        <a href="instructions.html">Instructions for this game</a>
                        <a href="leaderboard.py">Leaderboard </a>
                        <a href="">Cave Crawler </a>
                        <a href="logout.py">Log Out </a>
                </nav>
                <main>
                        <input type="text" id="name" value="%s" disabled />
                        
                        <article id="platformer">
                                <canvas width="1056" height="576"></canvas>
                        </article>
                </main>
                <aside>
                    <h1>Time</h1>
                    <p id="time"></p>
                    <h1>Coins</h1>
                    <p id="coins"></p>
                    <h1>Keys</h1>
                    <p id="keys"></p>
                    <h1>Last Score</h1>
                    <p id="score"></p>
                </aside>        

            """ % session_store.get('username')
            session_store.close()
except IOError:
    result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'

print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>Cave Crawler &#124; Platform Game</title>
            <link rel="stylesheet" href="styles.css">
            <script src="game.js" type="module"> </script>
        </head>
        <body>
            <header>
                <h1>Cave Crawler</h1>
            </header>
            %s
            
            <footer>
                <small>&copy; Jake Mulley </small>
                <small>Royalty free music from: https://samplefocus.com/</small>
                <a href="#header">Back To The Top</a>
	        </footer>
        </body>
    </html>""" % (result))