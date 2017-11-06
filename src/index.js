import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import connectToAlerts from "./utils/socketUtils";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import App from "./containers/app/App";

///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import jquery from "jquery";
window.$ = window.jQuery = jquery;
window.Popper = require("popper.js");
require("bootstrap/dist/js/bootstrap");
/////////////////////////////////////////////

const store = configureStore();
connectToAlerts(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
