# Remote task execution

## Summary

This client-server combo uses RPC over UDP to allow remote execution of bash commands. Standard output is redirected to client and standard input is sent from client to server.
It uses [node-udp-rpc](https://github.com/dfellis/node-udp-rpc) by David Ellis with some modifications.

## How to use

**Requires nodejs and npm. Tested on versions 7.10 and 4.2 respectively.**

After downloading the code run `npm install` in each of the folders: *server*, *client* and *common*.
To run client on default server (5555) use:

```bash
node server.js
```

Next run client with:

```bash
node client.js [ip] [port]
```

You will be prompted to entry the bash command you wish to execute. After that all I/O will be performed as if running on local machine. Client will exit if the remote command exits but you can also manually terminate execution with Ctrl + C.
