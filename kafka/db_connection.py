import mysql.connector
from time import gmtime, strftime
import re
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
insertQuery = ("INSERT INTO LogInfo(server, log_level, app, time, log_message) VALUES (%s, %s, %s, %s, %s);")
logs = ()

server = '10.10.10.7'
log_level = 'ERROR'
app = 'mysqld'
time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
log_message = 'Invalid insertion at node 0'


def insertQuery(cnx, log_obj):
    cursor = cnx.cursor()
    message  = re.escape(log_obj["message"])
    dateTime = log_obj["date"]+" "+log_obj["time"]
    insert_Query = "INSERT INTO LogInfo(server, log_level, app, time, log_message) VALUES ('"+log_obj["ip"]+"', '"+log_obj["log_level"]+"', '"+log_obj["app"]+"', '"+dateTime+"', '"+message+"')"
    log_entry = ("172.31.31.91", "ERROR", log_obj["app"], "2016-10-18 00:24:56", "Ss")
    cursor.execute(insert_Query)
    cnx.commit()
    #cursor.execute(selectQuery)
    #for (row) in cursor:
    #    print(row)
    cursor.close()

def closeConnection(cnx):
    cnx.close()
