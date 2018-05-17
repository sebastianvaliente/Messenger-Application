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

    // console.log(this.state.clients)

    this.socket = new WebSocket('ws://localhost:8080')

    this.socket.onmessage = (event) => {
      let parsedData = JSON.parse(event.data)
      if (parsedData.id) {
        this.receiveMessageAndUpdateState(parsedData)
      } else if (parsedData.clients) {
        console.log(this.state.clients)
        this.setState({clients: parsedData.clients})
      }
    }


  }


  sendMessageToServer = (data) => {
    const message = {
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
      this.setState( {currentUser: {name: user}} )
    }
  }

  receiveMessageAndUpdateState = (message) => {

    if (message.type === 'incomingMessage') {
      const update = {
        username: this.state.currentUser.name,
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
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} sendMessageToServer={this.sendMessageToServer} sendUserToServer={this.sendUserToServer}/>
      </div>
    );
  }

}

export default App;
