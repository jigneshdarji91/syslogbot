from kafka import KafkaProducer as Producer
import time
from syslog_parser import Parser
import json
import socket
import os

BROKER_SOCKET=os.environ.get('BROKER_SOCKET')


producer = Producer(bootstrap_servers=BROKER_SOCKET)
parser = Parser()
ip_address = socket.gethostbyname(socket.gethostname())

def read_stream (filename):
    syslogfile = open(filename,'r')
    while True:
        line = ''
        while len(line) == 0 or line[-1] != '\n':
            tail = syslogfile.readline()
            if tail == '':
                time.sleep(0.1)
            line += tail
        line = ip_address + " " + line
        log_obj = parser.parse(line)
        log_obj["message"] = line
	#print(log_obj)
        if "content" in log_obj and len(log_obj["content"]) > 0:
            #print(line)
            #line = ip_address + " " + line
            send_log(line)


def send_log (message):
    producer.send('logs', message)

read_stream ('/var/log/syslog')
