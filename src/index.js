///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import jquery from 'jquery';
window.$ = window.jQuery=jquery;
window.Tether=require('tether');
require('bootstrap/dist/js/bootstrap');
/////////////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute} from 'react-router';

/////////////////////////////////////////////////////////////////////////
// browserHistory would be preferred over hashHistory, but browserHistory 
// would require configuring the server. So we will use hashHistory here.
// Please change to browserHistory if you have your own backend server.
// import {browserHistory as history} from 'react-router';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
const history = useRouterHistory(createHashHistory)();
//////////////////////////////////////////////////////////////////////////

import configureStore from './store/configureStore';
import connectToAlerts from './utils/socketUtils';

import App from './containers/app/App';
import Login from './containers/login/Login';
import RestrictPage from './containers/misc/RestrictPage';
import Home from './containers/home/Home';
import UsersPage from './containers/user/UsersPage';
import ReposPage from './containers/repo/ReposPage';
import About from './containers/about/About';
import NotFound from './containers/misc/NotFound';

import './index.css';

const store = configureStore();
connectToAlerts(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/login" component={Login}/>
          <Route component={RestrictPage}>
            <Route path="/users" component={UsersPage} />
            <Route path="/repos" component={ReposPage} />
          </Route>

          <Route path="*" component={NotFound}/>
      </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
);
