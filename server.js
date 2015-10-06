// webpack
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const webpackPort = 3001;
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  headers: {'Access-Control-Allow-Origin': '*'},
}).listen(webpackPort, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('WebpackDevServer listening at localhost:'+webpackPort);

});


//  rest api
var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: false
}); 
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, '');

var bodyParser = require('body-parser');
app.use(express.static(publicPath));
app.use(bodyParser.json({ type: 'application/json' }))


if (!isProduction) {
  app.post('/api/login', function(req, res) {
      const credentials = req.body;
      console.log('credentials='+credentials);
      console.log('user='+credentials.user);
      console.log('password='+credentials.password);
      if(credentials.user==='admin' && credentials.password==='password'){
        res.json({'user': credentials.user, 'role': 'ADMIN'});   
      }else{
        res.status('500').send({'message' : 'Invalid user/password'});
      }
  });

  app.post('/api/logout', function(req, res) {
      res.json({'user': 'admin', 'role': 'ADMIN'});   
  });

  app.all('/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:3001'
    });
  });

  proxy.on('error', function(e) {
    console.log('error: '+e)
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  const server = http.createServer(app);

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  }); 

} else {
  // And run the server
  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });

}