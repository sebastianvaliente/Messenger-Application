const express = require('express')
const SocketServer = require('ws').Server;

const UUID = require('uuid/v1')

const PORT = 8080;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => {console.log(`Listening on ${PORT}`)})


const wss = new SocketServer({server});

wss.on('connection', (ws) => {
  console.log("Client connected.")


  wss.on('close', () => {console.log("Disconnected.")})

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data)
    if (parsedData.type === 'postMessage') {
      parsedData.type = 'incomingMessage'
    }
    const message = {
      id: UUID(),
      text: parsedData.text,
    }
    ws.send(JSON.stringify(message))
  })

});
