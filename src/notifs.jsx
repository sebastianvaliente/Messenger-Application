import React, {Component} from 'react';


function Notifications(props) {
  console.log(props.data)
  return (
    <div className="message system">
      {props.data.oldUser} changed his name to {props.data.newUser}
    </div>
  )
}

export default Notifications;
