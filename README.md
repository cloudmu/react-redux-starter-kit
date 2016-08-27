# [react-redux-starter-kit](http://cloudmu.github.io/react-redux-starter-kit/)

This is yet another React and Redux based web application starter kit. However, this one attempts to balance simplicity with showcasing several great technologies (such as [React](https://github.com/facebook/react), [Redux](https://github.com/gaearon/redux), 
[React-Router](https://github.com/rackt/react-router), [Bootstrap](https://github.com/twbs/bootstrap), [Babel](http://babeljs.io), 
[Webpack](http://webpack.github.io) and [JWT](https://jwt.io)) that are used together to develop a real web application, with features such as 
authentication, navigation, asynchronous data fetching, error handling, caching and pagination, etc.

But first, the [obligatory demo!](http://cloudmu.github.io/react-redux-starter-kit/) This displays info from github - most followed users, and most starred repo's. Here's a screen shot:

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

**Best React practice by separating ["smart" and "dumb" components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)**

This design pattern makes even more sense when using React along with Redux, where top-level smart components (a.k.a. containers in this codebase such as `UsersPage` and `ReposPage`) subscribe to Redux state and dispatch Redux actions, while low level components (such as `User`, `Repo`, and `Header`) read data and invoke callbacks passed in as props.

**Async Data fetching with caching and pagination**

The `UsersPage` and `ReposPage` would show most followed Github users (with 1000+ followers) and most starred Github repos (with 10000+ stars). The async actions (see `users` and `reposunder` actions) fetch data from the following Github APIs: 

-  `https://api.github.com/search/users?q=followers:>1000&order=desc&page=1` 
-  `https://api.github.com/search/repositories?q=stars:>10000&order=desc&page=1`

The fetched data are stored with the page number as the lookup key, so that the local copy can be shown without the need to re-fetch the same data remotely each time. However cached data can be invalidated if desired.

**Error handling while fetching data**

You can test this by disabling your internet connection. Or even better, you can page through `UsersPage` or `ReposPage` very quickly and hopefully invoke Github's API rate limit for your IP address. 
The application would fail gracefully with the error message if data fetching (for a particular page) fails. However, the application can still show cached data for other pages, which is very desirable behavior.

**Authentication and Page Restrictions**

Certain UI pages (`UsersPage` and `ReposPage`) are restricted. You can only access them after signing in to the Application. When accessing restricted pages without signing in first, the application would redirect to the `Login` page. You can log in as user "admin" and password "password". The authentication is based on JSON Web Token (JWT).

## What's New

* I recently (Aug/2016) ported this project to use [create-react-app](https://github.com/facebookincubator/create-react-app). Enjoy config-free (fatigue-free) React!
* A JWT based API server is added, thanks to the latest create-react-app feature [Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/ef94b0561d5afb9b50b905fa5cd3f94e965c69c0/template/README.md#proxying-api-requests-in-development).
* The async actions (involving restful api calls for authentication and fetching Github users and repos) are now refactored to go through a common utility callApi.

## Wish List / Known Issues

**Non-Univeral**
There are many cases where universal (server-side) rendering is simply not useful or required, a web application these days is not "cutting edge" or "cool" if it's not universal (isomorphic). 

**WebSocket**
It would be interesting to show a use case of WebSocket, which is common for a real-world web application.

## Getting Started
I used [create-react-app](https://github.com/facebookincubator/create-react-app) to easily create a base application. I then added the project specific code for querying github, displaying results, etc. 

To get started, you must run `npm install` one time in the `src` directory to install the node_modules. 

In the project directory, you should install the dependencies first:
### `npm install`

**You’ll need to have Node installed on your machine**. (Node >= 6 and npm >= 3 are recommended).

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## How Do I ... ?

This project was ported to use [create-react-app](https://github.com/facebookincubator/create-react-app) for handling all assets. 
Please refer its [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md).

## Server Side
Above description and scripts are for the client side based on the [create-react-app](https://github.com/facebookincubator/create-react-app).  Note certain UI pages require authentication.
In order for the JWT based authentication to work, you need to run a separate [API server](https://github.com/cloudmu/react-redux-starter-kit/tree/master/server).  The client login/logout requests will be proxied to the API server, thanks to the create-react-app feature 
[Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/ef94b0561d5afb9b50b905fa5cd3f94e965c69c0/template/README.md#proxying-api-requests-in-development).

**See the proxy configuration in the packages.json:**
```
"proxy": "http://localhost:3001/",
```
Under the [server directory](https://github.com/cloudmu/react-redux-starter-kit/tree/master/server), you can run (in a separate command line window):

### `npm install`
This will install the dependencies for the server side.

### `npm run server`
This will run the API server on port 3001, which will be listening to the authentication requests (login/logout from the client).

## Credits
As a long-time backend developer (who enjoys writing obscure number-crunching "optimzation" algorithms in Java), I would never have thought of developing (let alone posting) a web application using javascript on Github, were it not for the fateful summer 2015 when I stumbled upon a [30 minutes video](https://www.youtube.com/watch?v=xsSnOQynTHs) by [Dan Abramov](https://twitter.com/dan_abramov), and his inspiring work on [Redux](https://github.com/rackt/redux).
Thanks for reading!
