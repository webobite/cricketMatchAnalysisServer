'use strict';

const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
var port = process.env.PORT || 8080;

const dataRoute = require('./routes/main.route');


app.use('/api', dataRoute);

// Start server
function startServer() {
  server.listen(process.env.PORT || 8080, function () {
    console.log('Express server listening on ', process.env.PORT || 8080);
  });
}

setImmediate(startServer);
