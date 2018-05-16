import React, {Component} from 'react';
import Message from './message.jsx';

function MessageList(props) {
  const messages = props.messages.map((data) => { return <Message data={data} key={data.id}/> })
  return (
    <div>
    {messages}
  </div>
  )
}

export default MessageList;
