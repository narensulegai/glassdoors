const { Kafka, logLevel } = require('kafkajs');
const crypto = require('crypto');

const allTopics = {
  API_CALL: 'api-call',
  API_RESP: 'api-resp',
};

// Example usage
// (async () => {
// const k = await kafka();
// k.subscribe(allTopics.TOPIC1, console.log);
// k.send(allTopics.TOPIC1, 'm1');
// const s = await k.callAndWait('sum', [1, 2]);
// })();

async function kafka() {
  const k = new Kafka({
    logLevel: logLevel.NOTHING,
    clientId: "glassdoor",
    brokers: process.env.KAFKA_BROKERS.split(","),
  });

  const producer = k.producer();
  const groupId = process.env.GROUP;
  // App wide consumer group
  const consumer = k.consumer({ groupId, fromBeginning: true });
  // Topics need to be defined before staring the server
  const topics = Object.values(allTopics);
  const subscriptions = {};
  await producer.connect();
  await consumer.connect();
  const awaitCallbacks = {};
  await Promise.all(topics.map((topic) => consumer.subscribe({ topic })));

  const send = async (topic, msg) => producer
    .send({ topic, messages: [{ value: JSON.stringify(msg) }] });

  const subscribe = (topic, callback, name = null) => {
    if (!subscriptions.hasOwnProperty(topic)) {
      subscriptions[topic] = [];
    }
    subscriptions[topic].push((...args) => callback(...args, name));
  };

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (subscriptions.hasOwnProperty(topic)) {
        subscriptions[topic].forEach((callback) => {
          callback(JSON.parse(message.value.toString()), new Date(parseInt(message.timestamp)));
        });
      }
    },
  });

  console.log(`Connected to kafka, joining consumer group ${groupId}`);

  subscribe(allTopics.API_RESP, ({ token, resp, success }) => {
    awaitCallbacks[token][success ? 0 : 1](resp);
    delete awaitCallbacks[token];
  });

  return {
    send,
    subscribe,
    callAndWait: (fn, ...params) => new Promise((resolve, reject) => {
      const token = crypto.randomBytes(64).toString('hex');
      awaitCallbacks[token] = [resolve, reject];
      send(allTopics.API_CALL, { fn, params, token });
    }),
  };
}

module.exports = { kafka, topics: allTopics };
