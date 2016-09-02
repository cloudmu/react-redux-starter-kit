/** 
 * This is a simple express server, to show basic authentication services (login and logout requests)
 * based JWT, and basic socket.io.
 * 
 * Once a user is authenticated, a jwt token will be returned as response to the client. 
 * It's expected the jwt token will be included in the subsequent client requests. The server
 * can then protect the services by verifying the jwt token in the subsequent API requests.
 * 
 * The server will also broadcast the login/logout events to connected clients via socket.io.
 * 
 */
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var port = 3001;

// Configure app to use bodyParser to parse json data
var app = express(); 
var server = require('http').createServer(app);  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// and support socket io
var io = require('socket.io')(server);             

// Test server is working (GET http://localhost:3001/api)
app.get('/api/', function(req, res) {
  res.json({ message: 'Hi, welcome to the server api!' });   
});

// This should be well-guarded secret on the server (in a file or database).
var JWT_SECRET = "JWT Rocks!";

// JWT based login service.
app.post('/api/login', function(req, res) {
  console.log('Requesting /api/login ...');

  const credentials = req.body;

  // In real world credentials should be authenticated against database.
  // For our purpose it's hard-coded:
  if(credentials.user==='admin' && credentials.password==='password') {
    // Once authenticated, the user profiles is signed and the jwt token is returned as response to the client.
    // It's expected the jwt token will be included in the subsequent client requests.
    const profile = {'user': credentials.user, 'role': 'ADMIN'};
    const jwtToken = jwt.sign(profile, JWT_SECRET, {'expiresIn' : 5*60});  // expires in 300 seconds (5 min)
    res.status(200).json({
      id_token: jwtToken
    });

    alertClients('info', `User '${credentials.user}' just logged in`);
  }else{
    res.status(401).json({'message': 'Invalid user/password'});
    
    alertClients('error', `User '${credentials.user}' just failed to login`);
  }
});

// Alerts all clents via socket io.
function alertClients(type, msg) {
  console.log("SocketIO alerting clients: ", msg);
  io.sockets.emit('alert', { message: msg, time: new Date(), type}); 
}

/**
 * Util function to extract jwt token from the authorization header
 */
function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  }
  return null;
}

//  Logout api.  For illustration purpose we show how to check if the request is from an authorized user by
//  verifying the jwt token included in the request header.  The same approach can be used to restrict access
//  to other (more intersting) API calls.
app.post('/api/logout', function(req, res) {
  console.log('Requesting /api/logout ...');

  var jwtToken = extractToken(req);
  try {
    var profile = jwt.verify(jwtToken, JWT_SECRET);
    res.status(200).json({'message' : `User ${profile.user} logged out`});
    
    alertClients('info', `User '${profile.user}' just logged out`);
  } catch(err) {
    console.log("jwt verify error", err);
    res.status(500).json({'message' : 'Invalid jwt token'});
    
    alertClients('error', `JWT verify error`);
  }
});

// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);