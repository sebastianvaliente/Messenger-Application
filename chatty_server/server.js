const express = require('express')
const SocketServer = require('ws').Server;

const UUID = require('uuid/v1')

const PORT = 8080;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => {console.log(`Listening on ${PORT}`)})


const wss = new SocketServer({server});


wss.on('connection', (ws) => {

  wss.clients.forEach(function each(client) {
    client.send( JSON.stringify({clients: wss.clients.size}) )
  });

  ws.on('close', () => {
    console.log("yo")
    wss.clients.forEach(function each(client) {
      client.send( JSON.stringify({clients: wss.clients.size}) )
      })
    })

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data)

    // if data is a message
    if (parsedData.type === 'postMessage') {
      const message = {
        id: UUID(),
        text: parsedData.text,
        type: 'incomingMessage'
      }
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(message)) })

        // if data is a notification
      } else if (parsedData.type === 'postNotification') {

        parsedData.type = 'incomingNotification'
        parsedData.id = UUID()


        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(parsedData)) })
     }
  })

});
