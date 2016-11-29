import threading, logging, time
from kafka import KafkaConsumer, KafkaProducer
import os

BROKER_SOCKET=os.env['BROKER_SOCKET']


class Consumer(threading.Thread):
    daemon = True

    def run(self):
        consumer = KafkaConsumer(bootstrap_servers=BROKER_SOCKET,
                                 auto_offset_reset='earliest')
        consumer.subscribe(['logs'])
	print(consumer)
        for message in consumer:
            print (message)


def main():
    Consumer().start()
    time.sleep(10)

if __name__ == "__main__":
    main()
