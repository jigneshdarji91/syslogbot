from kafka import KafkaProducer as Producer
producer = Producer(bootstrap_servers='localhost:9092')
for i in range(100):
    producer.send('logs', 'this is a message: ' + str(i))
