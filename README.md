# [react-redux-starter-kit](http://cloudmu.github.io/react-redux-starter-kit/)

This is yet another single page web application template using React. However, this project attempts to balance simplicity with developing a real web application that actually "does something useful". 
It demonstrates authentication, navigation, asynchronous data fetching, error handling, and caching and pagination, etc. using the technologies listed below.

But first, the [demo!](http://cloudmu.github.io/react-redux-starter-kit/) It displays information retrieved from the Github API - most followed users and most starred repo's. 
Credentials are user *admin* and password *password*. 

Note the deployed demo may not always be up to date. Check out the latest project and [run the demo](#getting-started) yourself.
Here's a screenshot:

![alt text](https://raw.githubusercontent.com/cloudmu/react-redux-starter-kit/master/screenshot.png "Screenshot")

## Technologies used:

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/rackt/redux)
- [React Router](https://github.com/rackt/react-router)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [JSON Web Token](https://jwt.io/)
- [Socket.IO](http://socket.io/)
- [create-react-app](https://github.com/facebookincubator/create-react-app/)
- [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/) (now behind the scenes thanks to create-react-app)

## Feature highlights:

#### Best React Practice - [Separating "smart" and "dumb" components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

This design pattern makes even more sense when using React along with Redux, where top-level smart components (a.k.a. containers in this codebase such as `UsersPage` and `ReposPage`) subscribe to Redux state and dispatch Redux actions, while low level components (such as `User`, `Repo`, and `Header`) read data and invoke callbacks passed in as props.

#### Async Data Fetching with Caching and Pagination

The `UsersPage` and `ReposPage` would show most followed Github users (with 1000+ followers) and most starred Github repos (with 10000+ stars). The async actions (see `users` and `repos` under actions) fetch data from the following Github APIs: 

-  `https://api.github.com/search/users?q=followers:>1000&order=desc&page=1` 
-  `https://api.github.com/search/repositories?q=stars:>10000&order=desc&page=1`

The fetched data are stored with the page number as the lookup key, so that the local copy can be shown without the need to re-fetch the same data remotely each time. However cached data can be invalidated if desired.

#### Error Handling while Fetching Data

You can test this by disabling your internet connection. Or even better, you can page through `UsersPage` or `ReposPage` very quickly and hopefully invoke Github's API rate limit for your IP address. 
The application would fail gracefully with the error message if data fetching (for a particular page) fails. However, the application can still show cached data for other pages, which is very desirable behavior.

#### Authentication and Restricted Pages

Certain UI pages (`UsersPage` and `ReposPage`) are only accessible after signing in to the application. When accessing restricted pages without signing in first, the application redirects to the `Login` page. The authentication is based on [JSON Web Token (JWT)](https://jwt.io/).

#### Socket.IO

A "server alerts/notifications" use case is implemented to showcase [Socket.IO](http://socket.io/).  Whenever a client logs in/out of the application using the API server, the API server will notify currently connected clients via Socket.IO.  You can test this use case by opening
the web app in two browsers side by side, and then log in/out the webapp in one browser, and observe the messages in the other browser.  The messages are pushed from the server to the clients in "real time", and show up as `Alerts` in the header section of the web app.

## What's New

* I recently (Aug/2016) ported this project to use [create-react-app](https://github.com/facebookincubator/create-react-app). Enjoy configuration-free (fatigue-free) React!
* A JWT based API server is added, thanks to the latest create-react-app feature [Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/ef94b0561d5afb9b50b905fa5cd3f94e965c69c0/template/README.md#proxying-api-requests-in-development).
* The async actions for restful API calls for authentication and fetching Github users and repos are now refactored to go through a common utility `callApi()`.
* "server alerts/notifications" use case is implemented to showcase [Socket.IO](http://socket.io/).

## Wish List / Known Issues
**Universal**

Although it's "cool" to have universal (server-side, isomorphic) rendering these days, there are many situations (like this one) where that complexity is simply not useful or applicable (e.g. Java backend).

## Getting Started
Thanks to [create-react-app](https://github.com/facebookincubator/create-react-app), we will have a configuration-free dev experience. 

To get started, please clone this git repository and then run `npm install` once under the project top-level directory. 

```
git clone https://github.com/cloudmu/react-redux-starter-kit.git
cd react-redux-starter-kit
npm install
```
This will install the dependencies for the client side.

**You’ll need to have Node installed on your machine**. (Node >= 6 and npm >= 3 are recommended).

## While You're Developing...
Whenever you want to run/test the program, `cd` to the project top-level directory. Use these commands:

### `npm start`

Runs the app in the development mode, using the Webpack-provided "development server".<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.<br>
**Note The web app is up and running now, but some features (such as JWT-based authentication and server alerts/notifications) rely on an API Server. Be sure to run the [API Server](#an-api-server) as well.**

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

Note: `eject` is an advanced `create-react-app` tool. Read the [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for details.

## An API Server
The text and scripts above describe the client-side code that is displayed in the web browser. They rely on the Webpack-provided development server that runs on port 3000. 

This project also contains a separate [API server](https://github.com/cloudmu/react-redux-starter-kit/tree/master/server) that runs on a different port (3001) and handles authentication for certain UI pages using JWT based authentication.
The client login/logout requests will be proxied to the API server as described in: 
[Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/ef94b0561d5afb9b50b905fa5cd3f94e965c69c0/template/README.md#proxying-api-requests-in-development).

In addition, the server will push notifications to the clients via [Socket.IO](http://socket.io/).

First you need to open a separate command line window, and run `npm install` under the project's `server` directory. 

```
cd react-redux-starter-kit
cd server
npm install
```

Then you can start the API server (under the project's server directory):

### `npm run server`

This starts the API server on port 3001, which listens for authentication (login/logout) requests from the client, and pushes server notifications. At this point, the application is fully operating.

## How Do I ... ?

This project was ported to use [create-react-app](https://github.com/facebookincubator/create-react-app) for handling all assets. 
Many questions are answered in its [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md).

## Credits
As a long-time backend developer (who writes preditive analytics and optimization algorithms), I would never have thought of posting a web application using Javascript on Github, were it not for the fateful summer 2015 when I stumbled upon a [30 minutes video](https://www.youtube.com/watch?v=xsSnOQynTHs) by [Dan Abramov](https://twitter.com/dan_abramov), and his inspiring work on [Redux](https://github.com/rackt/redux).
Thank you.
