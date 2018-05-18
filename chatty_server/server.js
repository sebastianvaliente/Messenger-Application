const express = require('express')
const SocketServer = require('ws').Server;
const UUID = require('uuid/v1'); // for unique id's
const PORT = 8080;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => {console.log(`Listening on ${PORT}`)})

const wss = new SocketServer({server});
const colors = ['red', 'blue', 'green', 'purple']; //array of colours to assign to each new client
let colorIndex = -1; // starting the index at -1 so at first iteration starts at 0 (see line 19)

wss.on('connection', (ws) => {
 // every time a client conneccts, the server sends the amount clients connected, plus a
 // proprietary color for that client to display when they send messages
  wss.clients.forEach(function each(client) {
    if (colorIndex === 4) {
      colorIndex = 0;
    };
    colorIndex += 1;
    client.send( JSON.stringify({numberOfClients: wss.clients.size, clientColor: colors[colorIndex]}) )
  });

  // when a client disconnects, an updated number of connected clients is sent to all clients
  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      client.send( JSON.stringify({clients: wss.clients.size}) )
      })
    });

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data);
    // if data is a message
    if (parsedData.type === 'postMessage') {
      const message = {
        id: UUID(),
        username: parsedData.username,
        usercolor: parsedData.usercolor,
        text: parsedData.text,
        type: 'incomingMessage'
      };
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(message)) })

        // if data is a notification
      } else if (parsedData.type === 'postNotification') {
        parsedData.type = 'incomingNotification';
        parsedData.id = UUID();

        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(parsedData)) })
     }
  })

});
