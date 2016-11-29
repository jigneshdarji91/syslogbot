import json, threading, logging, time
from kafka import KafkaProducer
from syslog_parser import Parser
import os

BROKER_SOCKET=os.env['BROKER_SOCKET']

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
        log_obj["message"] = line
	#print log_obj
        #if hasattr(log_obj, "content"):
	return log_obj
	#else:
	#     return 'null'

class Producer(threading.Thread):
    daemon = True

    def run(self):
        producer = KafkaProducer(bootstrap_servers=BROKER_IP)
        producer.send('logs', 'test')
        msg1 = "{'definitely':'changed'}"
	producer.send('logs',b"%s" % msg1)

        while True:
            #producer.send('logs', b"test")
            #producer.send('logs', b"\xc2Hola, mundo!")
            msg = read_stream('/var/log/syslog')
            msg2 = "{'content'"+msg['content']+",'app'"+msg['app']+",'loglevel':error"+ "}"
            #if msg != 'null':
            print  msg
            producer.send('logs', b"%s" % msg2)
	    time.sleep(1)


def main():
    Producer().start()
    time.sleep(10)

if __name__ == "__main__":
    main()
