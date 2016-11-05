# Kafka Setup

## Requirements: 
- Install Kafka-Python
```
pip install kafka-python
```
- Install Zookeeper

- Run Zookeeper server
```
zkServer start
```

- Run Broker
```
kafka-server-start /usr/local/etc/kafka/server.properties
```

## Run

- Run consumer
```
pythong consumer.py
```

- Run producer
```
pythong producer.py
```
