import React, {Component} from 'react';
import io from 'socket.io-client';
import classNames from 'classnames';

class Alerts extends Component {

  componentWillMount(){
    this.state = {
      alerts: []
    };

    this.socket = io();  
    this.socket.on('connect_error', () => {    
      console.log("Socket.io connection error. Disconnecting socket ...");
      this.socket.disconnect();
      this.setState(
        {
          alerts: [{type: 'error', message: 'Socket.IO connection error. No message from server.', time: new Date().toString()}],
        }
      );
    }); 

    this.socket.on('alert', (data) => {               
      console.log(`Alert received from server: ${JSON.stringify(data)}`);
      const alerts = this.state.alerts || [];
      this.setState({ alerts: [...alerts, data] });
    });
  }

  componentWillUnmount(){
    console.log("Disconnecting socket ...");
     this.socket.disconnect();
  }

  dismiss = () => {
    this.setState({ alerts: [] });
  }

  alert = (type, message, time) => {
    const iconClass = classNames('fa', {'fa-info-circle text-success': type==='info'}, {'fa-warning text-danger': type==='error'});
    return <span><i style={{marginRight: '0.5em'}} className={iconClass}/>{message}{' '}<span className="tag tag-default">{time}</span></span>;
  }

  render() {
    const { alerts } = this.state;
    const count = (alerts && alerts.length) || 0;
    const badge = count<=1 ? `${count} new message` : `${count} new messages`;
    return (
    <li className="dropdown nav-item">
        <a href="#" className="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell warning" style={{marginRight: '0.5em'}}></i><span className="tag tag-warning">{badge}</span>
        </a>
        <ul className="dropdown-menu" style={{right:0, left: 'auto'}}>
          {count > 0 && (
            alerts.map((alert, i) =>
              <a key={i} className="dropdown-item">
                {this.alert(alert.type, alert.message, alert.time)}
                <div className="dropdown-divider"></div>
              </a>
            )
          )}

          {count > 0 &&
            <button className="dropdown-item" style={{textAlign: 'center'}} href="#" title="Dismiss all" onClick={this.dismiss}>Dismiss all</button>
          }
        </ul>
    </li>
  );
  }
}

export default Alerts;
