from kafka import KafkaProducer as Producer
import time

producer = Producer(bootstrap_servers='localhost:9092')

def read_stream (filename):
    syslogfile = open(filename,'r')
    while True:
        line = ''
        while len(line) == 0 or line[-1] != '\n':
            tail = syslogfile.readline()
            if tail == '':
                time.sleep(0.1)
            line += tail
        send_log (line)


def send_log (message):
    producer.send('logs', message)

read_stream ('/var/log/system.log')
