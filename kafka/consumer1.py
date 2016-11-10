import threading, logging, time

from kafka import KafkaConsumer, KafkaProducer


class Consumer(threading.Thread):
    daemon = True

    def run(self):
        consumer = KafkaConsumer(bootstrap_servers='localhost:9092',
                                 auto_offset_reset='earliest')
        consumer.subscribe(['logs'])

        for message in consumer:
            print (message)


def main():
    Consumer().start()
    time.sleep(10)

if __name__ == "__main__":
    main()
