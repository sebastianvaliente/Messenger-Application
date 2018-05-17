import React, {Component} from 'react';

function Message(props) {
  return (
    <div>
      <div className="message">
          <span className="message-username">{props.data.username}</span>
          <span className="message-content">{props.data.content}</span>
      </div>
   </div>
  )
}

export default Message;
