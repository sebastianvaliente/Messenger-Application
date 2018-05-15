import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import ChatBar from './chatbar.jsx';
import Navbar from './navbar.jsx'

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "1"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "2"
        }
      ]
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  createNewMessage() {
    this.setState({messages: })
  }


  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser.name}/>
      </div>
    );
  }

}

export default App;
