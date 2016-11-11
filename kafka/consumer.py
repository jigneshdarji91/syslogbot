from kafka import KafkaConsumer as Consumer
from syslog_parser import Parser
import json
parser = Parser()
consumer = Consumer(bootstrap_servers='35.163.99.103:9092')
consumer.subscribe(['logs'])
#print (json.loads(consumer))
for msg in consumer:
    log_obj = parser.parse(msg.value)
    log_obj["message"] = msg.value
    print(log_obj)
    
    #print msg
