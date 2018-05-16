import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import ChatBar from './chatbar.jsx';
import Navbar from './navbar.jsx'


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket('ws://localhost:8080')
    this.socket.onmessage = (event) => {

      this.receiveMessageAndUpdateState(event.data)

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
    this.setState({currentUser: {name: user}})

  }

  receiveMessageAndUpdateState = (content) => {
    const message = JSON.parse(content)
    const update = {
       username: this.state.currentUser.name,
        content: message.text,
        id: message.id
    }
    this.setState({messages: this.state.messages.concat([update])})
  }


  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser.name} sendMessageToServer={this.sendMessageToServer} sendUserToServer={this.sendUserToServer}/>
      </div>
    );
  }

}

export default App;
