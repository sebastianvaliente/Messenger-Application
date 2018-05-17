import React, {Component} from 'react';

function Navbar(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p >{props.users} users connected</p>
    </nav>
  )
}

export default Navbar;
