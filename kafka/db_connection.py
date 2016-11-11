import mysql.connector
from time import gmtime, strftime

config = {
        'host': '35.163.142.248',
        'port': 3306,
        'database': 'slackBotLog_db',
        'user': 'root',
        'password': 'syslogbot',
        'charset': 'utf8',
        'use_unicode': True,
        'get_warnings': True,
    }

def openConnection():
    cnx = mysql.connector.connect(**config)
    return cnx

selectQuery = ("select * from LogInfo;")	
insertQuery = ("INSERT INTO LogInfo VALUES (%s, %s, %s, %s, %s);")
logs = ()

server = '10.10.10.7'
log_level = 'ERROR'
app = 'mysqld'
time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
log_message = 'Invalid insertion at node 0'


def insertQuery(cnx, log_obj):
    cursor = cnx.cursor()
    log_entry = ("172.31.31.91", "ERROR", log_obj["app"], time, log_obj["message"])
    cursor.execute(insertQuery,log_entry)
    #cursor.execute(selectQuery)
    for (row) in cursor:
        print(row)
    cursor.close()

def closeConnection(cnx):
    cnx.close()
