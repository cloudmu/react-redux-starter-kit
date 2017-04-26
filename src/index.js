///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import jquery from "jquery";
window.$ = window.jQuery = jquery;
window.Tether = require("tether");
require("bootstrap/dist/js/bootstrap");
/////////////////////////////////////////////

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

/////////////////////////////////////////////////////////////////////////
// browserHistory would be preferred over hashHistory, but browserHistory
// would require configuring the server. So we will use hashHistory here.
// Please change to browserHistory if you have your own backend server.
///////////////////////////////////////////////////////////////////////////

import configureStore from "./store/configureStore";
import connectToAlerts from "./utils/socketUtils";

import App from "./containers/app/App";

import "./index.css";

const store = configureStore();
connectToAlerts(store);

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={App}>
//         <IndexRoute component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/login" component={Login} />
//         <Route component={RestrictPage}>
//           <Route path="/users" component={UsersPage} />
//           <Route path="/repos" component={ReposPage} />
//         </Route>

//         <Route path="*" component={NotFound} />
//       </Route>
//     </Router>
//   </Provider>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
