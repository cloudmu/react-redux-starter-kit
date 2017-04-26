import React, { Component } from "react";
import PropTypes from "prop-types";

/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Login from "../login/Login";
import PrivateRoute from "../misc/PrivateRoute";
import Home from "../home/Home";
import UsersPage from "../user/UsersPage";
import ReposPage from "../repo/ReposPage";
import About from "../about/About";
import NotFound from "../misc/NotFound";

import { logout } from "../../actions/auth";

import "./app.css";

class App extends Component {
  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
  }

  render() {
    const { user } = this.props;
    const isAuthenticated = true && user;
    return (
      <Router>
        <div>
          <div className="container">
            <Header user={user} handleLogout={() => this.handleLogout()} />
            <div className="appContent">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <PrivateRoute
                  path="/users"
                  isAuthenticated={isAuthenticated}
                  component={UsersPage}
                />
                <PrivateRoute
                  path="/repos"
                  isAuthenticated={isAuthenticated}
                  component={ReposPage}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null
  };
};

export default connect(mapStateToProps)(App);
