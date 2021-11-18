"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src/index.ts
var readline_1 = __importDefault(require("readline"));
var Producer = __importStar(require("./producer"));
var Consumer = __importStar(require("./consumer"));
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function start() {
    console.log('connecting...');
    Consumer.connect().then(function () {
        rl.question('enter user name \n', function (username) {
            Producer.getConnection(username).then(function (sendMessage) {
                console.log('connected, press Ctrl+C to exit');
                rl.on('line', function (input) {
                    readline_1.default.moveCursor(process.stdout, 0, -1); // removing the input so you don't get duplicated items in terminal
                    sendMessage(input);
                });
            });
        });
    });
}
start();
// handling shut down
process.on('SIGINT', process.exit);
process.on('exit', function () {
    Producer.disconnect();
    Consumer.disconnect();
    rl.close();
});
