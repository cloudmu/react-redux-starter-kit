# [react-redux-starter-kit](http://cloudmu.github.io/react-redux-starter-kit/)

This is yet another React and Redux based web application starter kit. However, this project attempts to balance simplicity with developing a real web application that actually "does something useful". It demonstrates authentication, navigation, asynchronous data fetching, error handling, and caching and pagination, etc. using the technologies listed below.

But first, the [obligatory demo!](http://cloudmu.github.io/react-redux-starter-kit/) This displays information retrieved from the Github API - most followed users and most starred repo's. Credentials are user *admin* and password *password*. Here's a screen shot:

![alt text](https://raw.githubusercontent.com/cloudmu/react-redux-starter-kit/master/screenshot.png "Screenshot")

## Technologies used:

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/rackt/redux)
- [React Router](https://github.com/rackt/react-router)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [JSON Web Token](https://jwt.io/)
- [create-react-app](https://github.com/facebookincubator/create-react-app/)
- [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/) (now behind the scene thanks to create-react-app)

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

Certain UI pages (`UsersPage` and `ReposPage`) are only accessible after signing in to the application. When accessing restricted pages without signing in first, the application redirects to the `Login` page. The authentication is based on JSON Web Token (JWT).

## What's New

* I recently (Aug/2016) ported this project to use [create-react-app](https://github.com/facebookincubator/create-react-app). Enjoy configuration-free (fatigue-free) React!
* A JWT based API server is added, thanks to the latest create-react-app feature [Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/ef94b0561d5afb9b50b905fa5cd3f94e965c69c0/template/README.md#proxying-api-requests-in-development).
* The async actions for restful API calls for authentication and fetching Github users and repos are now refactored to go through a common utility `callApi()`.

## Wish List / Known Issues

**Univeral**
Although it's "cool" to have universal (server-side, isomorphic) rendering these days, there are many situations (like this one) where that complexity is simply not useful or required.

**WebSocket**
It would be interesting to show a use case of WebSocket, which is common for a real-world web application.

## Getting Started
I used [create-react-app](https://github.com/facebookincubator/create-react-app) to easily create a base application. I then added the project specific code for querying github, displaying results, etc. 

To get started, you must clone this git repository and then run `npm install` for the main directory and the server `server` directory. 

```
git clone https://github.com/cloudmu/react-redux-starter-kit.git
cd react-redux-starter-kit
npm install
cd server
npm install
cd ..                 # to get back to the top-level directory
```

**You’ll need to have Node installed on your machine**. (Node >= 6 and npm >= 3 are recommended).

## While You're Developing...
Whenever you want to run/test the program, `cd` to the main directory. Use these commands:

### `npm start`

Runs the app in the development mode, using the Webpack-provided "development server".<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. To run the demo, be sure to run the [API Server](#an-api-server) as well.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

Note: `eject` is an advanced `create-react-app` tool. Read the [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for details.

## How Do I ... ?

This project was ported to use [create-react-app](https://github.com/facebookincubator/create-react-app) for handling all assets. 
Many questions are answered in its [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md).

## An API Server
The text and scripts above describe the client-side code that is displayed in the web browser. They rely on the Webpack-provided development server that runs on port 3000. 

This project also contains a separate [API server](https://github.com/cloudmu/react-redux-starter-kit/tree/master/server) that runs on a different port (3001) and handles authentication for certain UI pages using JWT based authentication.
The client login/logout requests will be proxied to the API server as described in: 
[Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/ef94b0561d5afb9b50b905fa5cd3f94e965c69c0/template/README.md#proxying-api-requests-in-development).

To start the api server, a) be sure to use `npm install` once - the **Getting Started** step above does this; b) open a separate command line window, cd to the [server directory](https://github.com/cloudmu/react-redux-starter-kit/tree/master/server) and use this command:

### `npm run server`
This starts the API server on port 3001, which listens for authentication (login/logout) requests from the client. At this point, the application is fully operating.

## Credits
As a long-time backend developer (who enjoys writing obscure number-crunching "optimization" algorithms in Java), I would never have thought of developing (let alone posting) a web application using Javascript on Github, were it not for the fateful summer 2015 when I stumbled upon a [30 minutes video](https://www.youtube.com/watch?v=xsSnOQynTHs) by [Dan Abramov](https://twitter.com/dan_abramov), and his inspiring work on [Redux](https://github.com/rackt/redux).
Thanks for reading!
