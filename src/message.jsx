import React, {Component} from 'react';

function Message(props) {
  const userStyle = {
    color: props.userColor
  }

  return (
    <div>
      <div className="message">
        <span style={userStyle} className="message-username">{props.data.username}</span>
        <span className="message-content">{props.data.content}</span>
      </div>
    </div>
  )
}



export default Message;
