import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import './header.css';

export default class Header extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.handleLogout();
  }

  render() {
    const { user } = this.props;
    const pathname = this.props.location.pathname;
    const isLoginPage = pathname.indexOf('login') > -1;
    const isAboutPage = pathname.indexOf('about') > -1;
    const isUsersPage = pathname.indexOf('users') > -1;
    const isReposPage = pathname.indexOf('repos') > -1;

    return (
      !isLoginPage &&
      <div className="pos-f-t">
        <nav className="navbar navbar-light bg-faded navbar-fixed-top">
          <div className="container-fluid">
            <button type="button" className="navbar-toggle pull-xs-left hidden-sm-up" data-toggle="collapse" data-target="#collapsingNavbar">&#9776;</button>

            <div id="collapsingNavbar" className="collapse navbar-toggleable-xs">
               <IndexLink to="/" className="navbar-brand">
                <div title="Home" className="brand"/>
                Home
              </IndexLink>
              <ul className="nav navbar-nav">
                <li title="Github Users with over 1000 Followers" className={isUsersPage ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/users">Most Followed Users</Link></li>
                <li title="Github Repos with over 10000 Stars" className={isReposPage ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/repos">Most Starred Repos</Link></li>
                <li title="About" className={isAboutPage ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/about">About Us</Link></li>
              </ul>

              <ul className="nav navbar-nav pull-xs-right">
                <li className="dropdown nav-item">
                  <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span className="fa fa-user header_fa"></span>{user || 'Anonymous'}<span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <a className="dropdown-item" href="#" onClick={ event => this.onLogoutClick(event)}><i className="fa fa-sign-out header_fa"/>Log out</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="https://github.com/cloudmu/react-redux-starter-kit"target="_blank" title="View on Github"><i className="fa fa-github header_fa"/>Github</a>
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
  handleLogout: PropTypes.func.isRequired,
  location: React.PropTypes.object,
};
