const UdpRpc = require('../common/udp-rpc');
const dgram = require('dgram');
const escaper = require('../common/coma-escaper');
const {
    spawn,
    exec
} = require('child_process');

var node;
var children = {};

const functions = [
    function runCommand(source, command, callback) {
        console.log(`RUNNING: ${command} (${source})`);
        var child = exec(command);
        child.stdout.addListener('data', (data) => {
            node.display(source, escaper.escape(data), null);
        });
        child.stderr.addListener('data', (data) => {
            node.display(source, escaper.escape(data), null);
        });
        child.on('exit', (code) => {
            node.exit(source, code, null);
            console.log(`Task ENDED (${source})`);
        });
        children[source] = child;
    },
    function passStdin(source, line, callback) {
        const original = escaper.unescape(line);
        const child = children[source];
        child.stdin.write(original);
    },
    function closeClient(source, callback) {
        const child = children[source];
        if (child) {
            child.kill('SIGINT');
            console.log(`Task EXITED (${source})`);
        }
    },
    function display(source, line, callback) {},
    function exit(source, code, callback) {},
]

const dgramType = dgram.createSocket('udp4');
node = new UdpRpc(dgramType, 5555, functions);

node.addListener('init', () => {
    console.log("Ready to work. Running on port 5555");
});
