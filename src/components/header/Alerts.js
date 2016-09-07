import React, {PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { dismiss } from '../../actions/alerts';
import connectToAlerts from '../../utils/socketUtils';
import classNames from 'classnames';

class Alerts extends Component {
  
  dismiss = () => {
    const { dispatch } = this.props;
    dispatch(dismiss());
  }

  reconnect = () => {
    const { store } = this.context;
    connectToAlerts(store);
  }

  alert = (type, message, time) => {
    const iconClass = classNames('fa', {'fa-info-circle text-success': type==='info'}, {'fa-warning text-danger': type==='error'});
    const localTime = new Date(time);
    return <span><i style={{marginRight: '0.5em'}} className={iconClass}/>{message}{' '}<span className="tag tag-default text-xs-right">{localTime.toLocaleString()}</span></span>;
  }

  render() {
    const { alerts, hasError } = this.props;
    const count = (alerts && alerts.length) || 0;
    const badge = count<=1 ? `${count} new message` : `${count} new messages`;
    return (
      <li className="dropdown nav-item">
        <a href="#" className="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell warning" style={{marginRight: '0.5em'}}></i><span className="tag tag-warning">{badge}</span>
        </a>
        <ul className="dropdown-menu" style={{right:0, left: 'auto', height: 'auto', maxHeight: '300px', overflowX: 'hidden'}}>
          <a className="dropdown-item text-xs-center">
            {count===0 && <span>No alerts as of <span className="tag tag-default">{new Date().toLocaleString()}</span></span>}
            {count>0 && <span>Alerts as of <span className="tag tag-default">{new Date().toLocaleString()}</span></span>}
            <div className="dropdown-divider"></div>
          </a>
          
          {count > 0 && (
            alerts.map((alert, i) =>
              <a key={i} className="dropdown-item">
                {this.alert(alert.type, alert.message, alert.time)}
                <div className="dropdown-divider"></div>
              </a>
            )
          )}

          <div className="dropdown-item text-xs-center">
            { count>0 && <a className="btn btn-sm btn-default" href="#" title="Dismiss all" onClick={this.dismiss}><i className="fa fa-remove" style={{marginRight: '0.5em'}}></i>Dismiss all</a> }
            { hasError && <a className="btn btn-sm btn-primary" href="#" title="Reconnect" onClick={this.reconnect}><i className="fa fa-refresh" style={{marginRight: '0.5em'}}></i>Reconnect</a> }
          </div>
        </ul>
      </li>
    );
  }
}

Alerts.contextTypes = {
  store: PropTypes.object.isRequired,
};

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { alerts } = state;
  return { alerts: alerts.alerts, hasError: alerts.hasError };
}

export default connect(mapStateToProps)(Alerts);
