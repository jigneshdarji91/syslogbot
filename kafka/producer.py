from kafka import KafkaProducer as Producer
import time
from syslog_parser import Parser

producer = Producer(bootstrap_servers='localhost:9092')
parser = Parser()


def read_stream (filename):
    syslogfile = open(filename,'r')
    while True:
        line = ''
        while len(line) == 0 or line[-1] != '\n':
            tail = syslogfile.readline()
            if tail == '':
                time.sleep(0.1)
            line += tail
        log_obj = parser.parse(line)
        send_log (log_obj)


def send_log (message):
    producer.send('logs', message)

read_stream ('/var/log/system.log')
