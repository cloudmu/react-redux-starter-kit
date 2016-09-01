import React, { Component } from 'react';

import './timebar.css';
import io from 'socket.io-client';

export default class Timebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 'A while ago, the time was: Wed Aug 24 2016 08:17155 GMT-0400 (EDT)'
    };
    this.socket = io();                             // set up socket to the server
    this.socket.on('time', (msg) => {               // when the server emits 'time' message
      console.log(`socket received: ${msg.text}`);  // log the new time
      this.setState({ time: msg.text });            // set the state to force a re-render
    })
  }
  render() {
    return (
        <div className="panel panel-custom">
          <div className="panel-body text-xs-center">
            {this.state.time}
          </div>
        </div>
      )
   };
}
