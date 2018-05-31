const UdpRpc = require('../common/udp-rpc');
const dgram = require('dgram');
const escaper = require('../common/coma-escaper');
const readline = require('readline');
const getPort = require('get-port');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const functions = [
    function runCommand(source, command, callback) {},
    function passStdin(source, line, callback) {},
    function display(source, line, callback) {
        const original = escaper.unescape(line);
        console.log(original);
    },
    function exit(source, code, callback) {
        console.log(`Exited with code ${code}`);
        process.exit(0);
    }
];

if (process.argv.length < 4) {
    console.log('Usage "node client.js [ip] [port]"');
    process.exit(1);
}
const remote = `${process.argv[2]}:${process.argv[3]}`

const dgramType = dgram.createSocket('udp4');
getPort().then(port => {
    const node = new UdpRpc(dgramType, getPort(), functions);
    node.addListener('init', () => {
        rl.question('What command would you like to run?\n', (answer) => {
            node.runCommand(remote, escaper.escape(answer), null);
        });
        rl.on('line', (line) => {
            const escaped = escaper.escape(line);
            node.passStdin(remote, escaped, null);
        });
    });
});
