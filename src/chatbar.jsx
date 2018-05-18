import React, {Component} from 'react';


class ChatBar extends Component {

  _handleKeyPressText = (e) => {
   if (e.key === 'Enter') {
     const messageText = e.target.value
     this.props.sendMessageToServer(messageText)
     e.target.value = '';
   }
 }

  _handleKeyPressUser = (e) => {
   if (e.key === 'Enter') {
     const user = e.target.value
     this.props.sendUserToServer(user)
     this.nameInput.focus(); // on enter, auto focus's on message text box
   }
 }


  render() {
    return (
      <footer className="chatbar">
        <input onKeyPress={this._handleKeyPressUser} className="chatbar-username" placeholder={this.props.user} />
        <input onKeyPress={this._handleKeyPressText} className="chatbar-message" placeholder="Type a message and hit ENTER" ref={(input) => { this.nameInput = input; }} />
      </footer>
    )
  }
}

export default ChatBar;
