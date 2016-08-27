import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      // logged in, let's show redirect if any, or show home
      try {
        const redirect = this.props.location.query.redirect;
        this.context.router.replace(redirect);
      } catch (err) {
        this.context.router.replace('/');
      }
    }
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.dispatch(login(username.value, password.value));
    username.value = '';
    password.value = '';
  }

  render() {
    const { user, loginError } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" style={{ float: 'none', margin: '0 auto' }}>
            <div className="card">
              <div className="card-header">Please Log in</div>
              <form className="card-block">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user"/></span>
                  <input type="text" ref="username" className="form-control" placeholder="Username (hint: admin)" required autoFocus/>
                </div>

                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock"/></span>
                  <input type="password" ref="password" className="form-control" placeholder="Password (hint: password)" required/>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                  </label>
                </div>

                {
                  !user && loginError &&
                  <div className="alert alert-danger">
                    {loginError.message}. Hint: use admin/password to log in.
                  </div>
                }

                <button className="btn btn-primary btn-block" onClick={this.handleLogin}><i className="fa fa-sign-in"/>{' '}Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

Login.propTypes = {
  user: PropTypes.string,
  loginError: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, loginError: auth.loginError };
  }

  return { user: null };
}

export default connect(mapStateToProps)(Login);
