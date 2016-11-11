import mysql.connector
from time import gmtime, strftime

cnx = mysql.connector.connect(user='root', password='syslogbot',
                              host='35.163.142.248',
                              database='slackBotLog_db')
cursor = cnx.cursor()

selectQuery = ("select * from LogInfo;")	
insertQuery = ("INSERT INTO LogInfo VALUES (%s, %s, %s, %s, %s);")

server = '10.10.10.7'
log_level = 'ERROR'
app = 'mysqld'
time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
log_message = 'Invalid insertion at node 0'

cursor.execute(insertQuery,(server, log_level, app, time, log_message))

cursor.execute(selectQuery,)

for (row) in cursor:
  print(row)

cursor.close()

cnx.close()