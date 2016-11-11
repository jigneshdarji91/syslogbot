from kafka import KafkaConsumer as Consumer
import json

consumer = Consumer(bootstrap_servers='35.163.99.103:9092')
consumer.subscribe(['logs'])
#print (json.loads(consumer))
for msg in consumer:
    print msg
