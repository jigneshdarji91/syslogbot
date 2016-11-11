import mysql.connector
from time import gmtime, strftime


def openConnection():
    cnx = mysql.connector.connect(user='root', password='syslogbot',host='35.163.142.248', database='slackBotLog_db')
    return cnx

selectQuery = ("select * from LogInfo;")	
insertQuery = ("INSERT INTO LogInfo VALUES (%s, %s, %s, %s, %s);")

server = '10.10.10.7'
log_level = 'ERROR'
app = 'mysqld'
time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
log_message = 'Invalid insertion at node 0'

def insertQuery(cnx, log_obj):
    cursor = cnx.cursor()
    cursor.execute(insertQuery,("172.31.31.91", "ERROR", log_obj["app"], time, log_obj["message"]))
    #cursor.execute(selectQuery,)
    for (row) in cursor:
        print(row)
    cursor.close()

def closeConnection(cnx):
    cnx.close()
