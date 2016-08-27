/** 
 * This is a simple express server, to show basic authentication services (login and logout requests)
 * based JWT.
 * 
 * Once a user is authenticated, a jwt token will be returned as response to the client. 
 * It's expected the jwt token will be included in the subsequent client requests. The server
 * can then protect the services by verifying the jwt token in the subsequent API requests.
 * 
 * This server also opens a socket.io socket to allow asynchronous communication with the client.
 * Note that the Webpack-provided development server automatically proxy's calls 
 *    to /socket.io/... to this server.
 */
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var port = 3001;

var app = express();  
var server = require('http').Server(app);       // this is the http listener

// Configure app to use bodyParser to parse json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
  }else{
    res.status(401).json({'message': 'Invalid user/password'});
  }
});

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
  } catch(err) {
    console.log("jwt verify error", err);
    res.status(500).json({'message' : 'Invalid jwt token'});
  }
});

// Set up the Socket.io listener...
var io = require('socket.io')(server);          // this is the socket.io listener
io.on('connection', (socket) => {
  console.log('User connected. Socket id %s', socket.id);

  socket.on('disconnect', function () {
        console.log('User disconnected. Socket id %s', socket.id);
    });
});
setInterval(()=> {
  const msg = `Time is: ${new Date()}`;
  console.log(`Sending to socket.io: ${msg}`);
  io.emit('time', { text: `${msg}`});
}, 10000);

// Start ther server
server.listen(port);
console.log('Server is listening on port ' + port);