import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import UserProfile from "./UserProfile";
import Alerts from "./Alerts";
import "./header.css";

class Header extends Component {
  onLogoutClick = event => {
    event.preventDefault();
    this.props.handleLogout();
    this.props.history.replace("/login");
  };

  render() {
    const { user } = this.props;
    const pathname = this.props.history.location.pathname;
    const isLoginPage = pathname.indexOf("login") > -1;
    const isAboutPage = pathname.indexOf("about") > -1;
    const isUsersPage = pathname.indexOf("users") > -1;
    const isReposPage = pathname.indexOf("repos") > -1;

    return (
      !isLoginPage &&
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link to="/" className="navbar-brand">
        <div title="Home" className="brand" />
        Home
      </Link>
      
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li
              title="Github Users with over 1000 Followers"
              className={isUsersPage ? "nav-item active" : "nav-item"}
            >
              <Link className="nav-link" to="/users">Most Followed Users</Link>
            </li>
            <li
              title="Github Repos with over 10000 Stars"
              className={isReposPage ? "nav-item active" : "nav-item"}
            >
              <Link className="nav-link" to="/repos">Most Starred Repos</Link>
            </li>
            <li
              title="About"
              className={isAboutPage ? "nav-item active" : "nav-item"}
            >
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
          </ul>

          <ul className="navbar-nav mt-2 mt-md-0">
            <Alerts />
            <UserProfile user={user} handleLogout={this.onLogoutClick} />
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
};

export default withRouter(Header);
