//src/index.ts
import { Kafka } from 'kafkajs';
import { env } from 'process';

const kafka = new Kafka({
  clientId: 'chat-app',
  brokers: [env.REDPANDA_BROKERS || '127.0.0.1:9092']
});

const producer = kafka.producer();

producer.connect().then(() => {
  return producer.send({
    topic: 'quickstart-events',
    messages: [
      { value: JSON.stringify({ message: process.argv[2] }) },
    ],
  }).then(() => {
    console.log('Message sent');
    return producer.disconnect();
  });
})


