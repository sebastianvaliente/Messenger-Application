import React, {Component} from 'react';


function ChatBar(props) {
  return (
  <footer className="chatbar">
    <input className="chatbar-username" placeholder={props.user} />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
  </footer>
  )
}

export default ChatBar;
