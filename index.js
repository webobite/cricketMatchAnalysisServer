'use strict';

const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;

const dataRoute = require('./routes/main.route');


app.use('/api', dataRoute);

// Start server
function startServer() {
  server.listen(port, function () {
    console.log('Express server listening on ', port);
  });
}

setImmediate(startServer);
