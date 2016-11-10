from kafka import KafkaConsumer as Consumer
import json

consumer = Consumer(bootstrap_servers='localhost:9092',value_deserializer=lambda m: json.loads(m.decode('utf-8')))
consumer.subscribe('logs')
#print (json.loads(consumer))
for msg in consumer:
    print msg
