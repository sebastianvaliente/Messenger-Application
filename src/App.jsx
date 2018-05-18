import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import ChatBar from './chatbar.jsx';
import Navbar from './navbar.jsx'


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // Where the messages from the chat are stored
      // clients:  (when a client connects to the ws server, the state is
    }
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:8080');
    // handler for messages received from the Chatty Server
    this.socket.onmessage = (event) => { 
      let parsedData = JSON.parse(event.data);

      if (parsedData.id) {
        this.receiveMessageAndUpdateState(parsedData);
      } else if (parsedData.numberOfClients && parsedData.clientColor) { // when a new client connects, two new properties are sent: 'clients' and 'clientColor'. If that exists, App.jsx handles the message differently
        this.setState({
          currentUser: {
            name: this.state.currentUser.name,
            color: parsedData.clientColor},
          clients: parsedData.numberOfClients });
      // seperate handler for when client disconnects, only the 'clients' property is sent
      } else if (parsedData.clients) {
        this.setState({clients: parsedData.numberOfClients}); // only number of clients is updated in state
      }
    }
  };

  // takes text from chatbar component
  sendMessageToServer = (data) => {
    const message = {
      username: this.state.currentUser.name,
      usercolor: this.state.currentUser.color,
      text: data,
      type: 'postMessage' // the server is setup to handle messages based on the value of this 'type' property
    };
    this.socket.send(JSON.stringify(message))
  }

  // when username changes (called from a keypress event in chatbar.jsx)
  sendUserToServer = (user) => {
    if (user === '') { // if user submits empty string in the username text box set username to Anonymous
      this.setState( {currentUser: {name: 'Anonymous'}} )
    } else if (user !== this.state.currentUser.name) {
      const postNotification = {
        type: 'postNotification', // this 'type' of message is set to be handled differently at the server side (see line 48)
        oldUser: this.state.currentUser.name, // sends the old username to display in the notification
        newUser: user
      };
      this.socket.send(JSON.stringify(postNotification))
      this.setState( {currentUser: {name: user, color: this.state.currentUser.color}} ) //changes name in state and maintains color in state (not to change when username changes)
    }
  }

  // once a message is sent to the WebSocket server, it is sent back to all clients and handled here
  receiveMessageAndUpdateState = (message) => {
    if (message.type === 'incomingMessage') {
      const update = {
        username: message.username,
        usercolor: message.usercolor,
        content: message.text,
        id: message.id,
        type: message.type
      };
      this.setState({messages: this.state.messages.concat([update])})
    } else if (message.type === 'incomingNotification') { // if message is a notification, the object is setup on the websocket server file
      this.setState({messages: this.state.messages.concat([message])})
    }
  }

  render() {
    return (
      <div>
        <Navbar users={this.state.clients}/>
        <MessageList messages={this.state.messages} userColor={this.state.currentUser.color} />
        <ChatBar user={this.state.currentUser.name} sendMessageToServer={this.sendMessageToServer} sendUserToServer={this.sendUserToServer}/>
      </div>
    );
  }

};

export default App;
