"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.getConnection = void 0;
// src/producer.ts
var kafkajs_1 = require("kafkajs");
var process_1 = require("process");
console.log("--->", process.env.REDPANDA_BROKERS);
var kafka = new kafkajs_1.Kafka({
    clientId: 'chat-app',
    brokers: [process_1.env.REDPANDA_BROKERS || '127.0.0.1:9092']
});
var producer = kafka.producer();
function getConnection(user) {
    return producer.connect().then(function () {
        return function (message) {
            return producer.send({
                topic: 'quickstart-events',
                messages: [
                    { value: JSON.stringify({ message: message, user: user }) },
                ],
            });
        };
    });
}
exports.getConnection = getConnection;
function disconnect() {
    return producer.disconnect();
}
exports.disconnect = disconnect;
