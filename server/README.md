
## Overview

This is the API server to provide authentication API (Restful services) based [JWT](https://jwt.io/).

The simple implemenation show cases the following JWT use cases: 

* Upon user authentication,  the user profile is signed and the jwt token is returned as response to the client.
  It's expected the jwt token will be included in the subsequent client requests (as authorization header).

* For subsequent client requests, the server will verify the jwt token extracted from the request headers.  
  Invalid requests are considered unauthorized access and should be rejected.

## Server Side Scripts
In order for the JWT based authentication work, you need to run this API server.  The client login/logout requests will be proxied to
the API server, thanks to the create-react-app feature [Proxying API Requests in Development](https://github.com/facebookincubator/create-react-app/blob/ef94b0561d5afb9b50b905fa5cd3f94e965c69c0/template/README.md#proxying-api-requests-in-development).


In this server directory, you can run (in a separate command line window):

### `npm i`
This will install the dependencies for the server side.

### `npm run server`
This will run the server on port 3001, which will be listening to the authentication requests (login/logout from the client).
