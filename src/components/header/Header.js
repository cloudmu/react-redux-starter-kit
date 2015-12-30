import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import './header.css';

export default class Header extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.handleLogout();
  }

  render() {
    const { user } = this.props;
    const pathname = this.context.location.pathname;
    const isLoginPage = pathname.indexOf('login') > -1;
    const isAboutPage = pathname.indexOf('about') > -1;
    const isUsersPage = pathname.indexOf('users') > -1;
    const isReposPage = pathname.indexOf('repos') > -1;

    const activeColor = { color: '#61dafb' };

    return (
      !isLoginPage &&
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <IndexLink to="/" className="navbar-brand" activeStyle={activeColor}>
                <div title="Home" className="brand"/>
                Home
              </IndexLink>
            </div>

            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li title="Github Users with over 1000 Followers" className={isUsersPage ? 'active' : ''}><Link to="/users">Most Followed Users</Link></li>
                <li title="Github Repos with over 10000 Stars" className={isReposPage ? 'active' : ''}><Link to="/repos">Most Starred Repos</Link></li>
                <li title="About" className={isAboutPage ? 'active' : ''}><Link to="/about">About Us</Link></li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span className="fa fa-user header_fa"></span>{user ? user : 'Anonymous'}<span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="logout-link"><a href="#" onClick={ event => this.onLogoutClick(event)}><i className="fa fa-sign-out header_fa"/>Log out</a></li>
                    <li role="separator" className="divider"></li>
                    <li>
                      <a href="https://github.com/cloudmu/react-redux-starter-kit"target="_blank" title="View on Github"><i className="fa fa-github header_fa"/>Github</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
};

Header.contextTypes = {
  location: React.PropTypes.object
};
