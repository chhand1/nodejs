const express = require('express');
const socket = require('socket.io');
var app = express();

var server = app.listen(4000, () => {
    console.log('Listening on port 4000...');
});

app.use(express.static('public'));
var upgradedServer = socket(server);
upgradedServer.on('connection', function (socket) {
    socket.on('sendingMessage', (data) => {
        upgradedServer.emit('broadcastMessage', data);
    })
    console.log('Websocket Connected:', socket.id);
});

