import React, { Component } from 'react';

import './home.css';

export default class Home extends Component {
  // the constructor is only necessary to listen for socket.io  
  constructor(props) {
    super(props);

    // the io() function call gets the value from the global name space, 
    // that comes from the <script> tag in index.html
    this.state = {                       
      time: 'A while ago, the time was: Wed Aug 24 2016 08:17155 GMT-0400 (EDT)',
    };
    this.socket = io();                             // listen for socket.io in the Home component
    this.socket.on('time', (msg) => {               // if server emits 'time'
      console.log(`socket received: ${msg.text}`);  // log the new time
      this.setState({ time: msg.text });            // set the state; <Home /> updates the time
    })
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Yet Another Web App Starter Kit</h1>
            <p className="lead">
            This is yet another React based web application starter kit.
            However, this one attempts to go beyond the typical simple boilerplates, by showcasing several great
            technologies (such as
              <a href="https://github.com/facebook/react" target="_blank"> React</a>,
              <a href="https://github.com/gaearon/redux" target="_blank"> Redux</a>,
              <a href="https://github.com/rackt/react-router" target="_blank"> React-Router</a>,
              <a href="https://github.com/twbs/bootstrap " target="_blank"> Bootstrap</a>, and
              <a href="https:// https://jwt.io" target="_blank"> JSON Web Token</a>
            ) used together to develop a more complex web
            application, with features such as authentication, navigation, asynchronous data fetching, error handling, caching and pagination, etc.
            </p>

            <div className="home-humility">
              <a href="https://github.com/cloudmu/react-redux-starter-kit" target="_blank">
                <i className="fa fa-github" /> View on Github
              </a>
              <a href="https://twitter.com/_cloudmu" target="_blank">
                 <i className="fa fa-twitter home-fa-twitter" />_cloudmu
              </a>
              <p><br />{this.state.time}</p>
            </div>
          </div>
        </div>

        <div className="container">

          <h3>What's New</h3>
            <p>
            When I started the project, I had to wrestle with Webpack and Babel to have the dev/build process work well.  Recently I ported the starter kit 
            to use <a href="https://github.com/facebookincubator/create-react-app/" target="_blank"> create-react-app</a>. I hope you will enjoy the "zero build
            configuration" experience as much as I do.
            </p>

          <h3>Technologies used:</h3>

          <ul>
            <li><a href="https://github.com/facebook/react" target="_blank">React</a></li>
            <li><a href="https://github.com/rackt/redux" target="_blank">Redux</a></li>
            <li><a href="https://github.com/rackt/react-router" target="_blank">React Router</a></li>            
            <li><a href="https://github.com/twbs/bootstrap " target="_blank"> Bootstrap</a></li>
            <li><a href="https://jwt.io" target="_blank">JSON Web Token</a></li>
            <li><a href="https://github.com/facebookincubator/create-react-app/" target="_blank">create-react-app</a></li>          
            <li><a href="http://babeljs.io" target="_blank">Babel</a> and <a href="http://webpack.github.io" target="_blank"> Webpack</a> (now behind the scene thanks to create-react-app)</li>

          </ul>

          <h3>Feature highlights:</h3>
          <br/>
          <dl>
            <dt>Best React practice by separating{' '}
              <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" target="_blank">
                 "smart" and "dumb" components
              </a>
            </dt>
            <dd>
              This design pattern makes even more sense when using React along with Redux, where top-level smart components
              (a.k.a. containers in this codebase such as <code>UsersPage</code> and <code>ReposPage</code>) subscribe
              to Redux state and dispatch Redux actions, while low level components (such as <code>User</code>,
              <code>Repo</code>, and <code>Header</code>) read data and invoke callbacks passed in as props.
            </dd>
            <br />

            <dt>Async Data fetching with caching and pagination</dt>
            <dd>
              The <code>UsersPage</code> and <code>ReposPage</code> would show most followed Github users (with 1000+ followers)
              and most starred Github repos (with 10000+ stars).  The async actions (see <code>users</code>, and <code>repos</code>
                under actions) fetch data from the following Github APIs: <br />
              <code>https://api.github.com/search/users?q=followers:>1000&order=desc&page=1</code> <br />
              <code>https://api.github.com/search/repositories?q=stars:>10000&order=desc&page=1</code> <br />
              The fetched data are stored with the page number as the lookup key, so that the local copy can be shown without the need
              to re-fetch the same data remotely each time. However cached data can be invalidated if desired.
            </dd>
            <br />

            <dt>Data fetching error handling</dt>
            <dd>
              You can test this by disabling your internet connection. Or even better, you can page through <code>UsersPage</code> or <code>ReposPage</code>
              very quickly and hopefully invoke Github's API rate limit for your IP address. <br />
              The application would fail gracefully with the error message if data fetching (for a particular page) fails. However, the application
              can still show cached data for other pages, which is very desirable behavior.
            </dd>
            <br />

            <dt>Authentication and Page Restrictions</dt>
            <dd>
              Certain UI pages (<code>UsersPage</code> and <code>ReposPage</code>) are restricted.  You can only access them after signing in to the
              Application.
              When accessing restricted pages without signing in first, the application would redirect to the <code>Login</code> page.
              You can log in as user "admin" and password "password".  The authentication is based on JSON Web Token (JWT).
            </dd><br />

            <dt>Non-Univeral</dt>
            <dd>
              Most people probably would listed this under "issues" or "wish list" instead, since these days a web application is not "cutting edge"
              or "cool" if it's not universal (isomorphic). However there are many cases
              where server-side rendering is simply not required or applicable (e.g. Java backend instead of Node).
            </dd>
          </dl>

          <h3>Wish List / Known Issues</h3>
          <dl>
            <dt>DRY issues in async actions</dt>
            <del>
              <dd>
                The two sets of aync actions (<code>users</code> and <code>repos</code>) apparently can/should be refactored to extract and re-use the common code.<br />
                The most obvious is the middleware approach illustrated in the excellent Redux documentation. But I am still digesting it.
              </dd>
            </del>
              <dd>
                [New]: The async actions (involving restful api calls for authentication and fetching Github users and repos) are now refactored to go through a common
                utility <code>callApi</code>.
              </dd>

            <br />
            <dt>WebSocket</dt>
            <dd>
              It would be interesting to show a use case of WebSocket, which is common for a real-world web application.
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
