import React, { PropTypes } from 'react';

import './user.css';

const User = ({ user }) => {
  const { login, avatar_url, html_url } = user;
  return (
    <div className="panel panel-info">
      <div className="panel-heading">

        <a href={ html_url } target="_blank">
          <div className="row">
            <div className="col-xs-4">
                <img src={ avatar_url } width="64" height="64"/>
            </div>
            <div className="col-xs-8">
                <div className="pull-right user-name">{login}</div>

            </div>
          </div>
        </a>
      </div>

      <div className="panel-footer">
          <a href={ 'http://github.com/' + login + '/followers'} target="_blank">
            <span className="label label-success pull-right">Followers</span>
          </a>
          <div className="clearfix"></div>
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
