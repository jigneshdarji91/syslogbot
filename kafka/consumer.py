from kafka import KafkaConsumer as Consumer
consumer = Consumer('logs', bootstrap_servers='localhost:9092')
for msg in consumer:
    print (msg)
