import React, { PropTypes } from 'react';


const UserProfile = ({user, handleLogout}) => {
  return (
    <li className="dropdown nav-item">
        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span className="fa fa-user" style={{marginRight: '0.5em'}}></span>{user || 'Anonymous'}<span className="caret"></span>
        </a>
        <ul className="dropdown-menu" style={{right:0, left: 'auto'}}>
          <a className="dropdown-item" href="#" onClick={ handleLogout }><i className="fa fa-sign-out" style={{marginRight: '0.5em'}}/>Log out</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="https://github.com/cloudmu/react-redux-starter-kit"target="_blank" title="View on Github"><i className="fa fa-github" style={{marginRight: '0.5em'}}/>Github</a>
        </ul>
    </li>
  );
}


UserProfile.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
};

export default UserProfile;
