import React, { PropTypes } from 'react';

import './user.css';

const User = ({ user }) => {
  const { login, avatar_url, html_url } = user;
  return (
    <div className="card">
      <div className="card-block">
          <div className="row">
            <div className="col-xs-6">
              <a href={ html_url } target="_blank">
                <img src={ avatar_url } width="96" height="96"/>
              </a>
            </div>
            <div className="col-xs-6">
              <ul className="list-unstyled">
                <a href={ html_url } target="_blank">
                  <li className="user-name m-t-10">{login}</li>
                </a>
                <a href={ 'http://github.com/' + login + '/followers'} target="_blank">
                  <li className="label label-success m-t-20">Followers</li>
                </a>
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired
  }).isRequired
};

export default User;
