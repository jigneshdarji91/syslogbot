from kafka import KafkaConsumer as Consumer
from syslog_parser import Parser
import json
import os
from db_connection import *
BROKER_SOCKET=os.env['BROKER_SOCKET']

parser = Parser()
cnx = openConnection()
consumer = Consumer(bootstrap_servers=BROKER_SOCKET)
consumer.subscribe(['logs'])
#print (json.loads(consumer))
for msg in consumer:
    log_obj = parser.parse(msg.value)
    log_obj["message"] = msg.value
    print(log_obj)
    insertQuery(cnx, log_obj)
    #print msg
