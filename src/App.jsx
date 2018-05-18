import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import ChatBar from './chatbar.jsx';
import Navbar from './navbar.jsx'


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
    }
  }



  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket('ws://localhost:8080')

    this.socket.onmessage = (event) => {
      let parsedData = JSON.parse(event.data)

      // if message is sent
      if (parsedData.id) {
        this.receiveMessageAndUpdateState(parsedData)
      // if user is changed
      } else if (parsedData.clients) {
        this.setState({
          currentUser: {
            name: this.state.currentUser.name,
            color: parsedData.clientColor},
          clients: parsedData.clients })
      }
    }


  }


  sendMessageToServer = (data) => {
    const message = {
      username: this.state.currentUser.name,
      usercolor: this.state.currentUser.color,
      text: data,
      type: 'postMessage'
    }
    this.socket.send(JSON.stringify(message))
  }

  sendUserToServer = (user) => {
    if (user === '') {
      this.setState( {currentUser: {name: 'Anonymous'}} )
    } else if (user !== this.state.currentUser.name) {
      const postNotification = {
        type: 'postNotification',
        oldUser: this.state.currentUser.name,
        newUser: user
      }
      this.socket.send(JSON.stringify(postNotification))
      this.setState( {currentUser: {name: user, color: this.state.currentUser.color}} )
    }
  }

  receiveMessageAndUpdateState = (message) => {
    if (message.type === 'incomingMessage') {
      const update = {
        username: message.username,
        usercolor: message.usercolor,
        content: message.text,
        id: message.id,
        type: message.type
      }
      this.setState({messages: this.state.messages.concat([update])})
    } else if (message.type === 'incomingNotification') {
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

}

export default App;
