#!/usr/local/bin/python3

from cgitb import enable

enable()

from cgi import FieldStorage
from html import escape
import pymysql as db

print('Content-Type: text/plain')
print()

form_data = FieldStorage()
score = escape(form_data.getfirst('score', '').strip())
score = int(score)
name = escape(form_data.getfirst('name', '').strip())
exists = False
try:
    connection = db.connect('', '', '', '')
    cursor = connection.cursor(db.cursors.DictCursor)

    cursor.execute("""SELECT username, highScore FROM users""")
    for row in cursor.fetchall():

        if row['username'].upper() == name.upper() and row['highScore'] < score:
            exists = True
            break
    if exists:
        cursor.execute("""UPDATE users SET highScore = '%d' WHERE username = '%s';""" % (score, name))
    connection.commit()
    print('success')
    cursor.close()
    connection.close()
except db.Error:
    print('problem')
