import React, {Component} from 'react';
import Message from './message.jsx';
import Notifications from './notifs.jsx'

function MessageList(props) {

  const messages = props.messages.map((data) => {
    if (data.type === 'incomingMessage') {
      return <Message data={data} key={data.id} userColor={data.usercolor}/>
    } else if (data.type === 'incomingNotification') {
      return <Notifications data={data} key={data.id}/>
    }
  })


  return (
    <div>
      <div>
        {messages}
      </div>
   </div>
  )

}

export default MessageList;
