from kafka import KafkaConsumer as Consumer
import json

consumer = Consumer('logs', bootstrap_servers='localhost:9092',value_deserializer=lambda m: json.loads(m.decode('utf-8')))
for msg in consumer:
    print (msg.value)
