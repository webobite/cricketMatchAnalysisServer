'use strict';

const http = require('http');
const fs = require('fs');

const express = require('express');
const multer = require('multer');
const csv = require('csvtojson');

const Router = express.Router;
const upload = multer({ dest: 'tmp/csv/' });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 3000;


/**
 * Route to upload the file and same CSV will be converted 
 * into array of Objects and sent back as response.
 */
router.post('/', upload.single('file'), function (req, res) {
  csv().fromFile(req.file.path)
    .then((jsonObj) => {
      console.log("Json Obj : : : ", jsonObj);
      fs.unlinkSync(req.file.path);   // remove temp file process "fileRows" and respond
      res.send({
        success: true,
        data: jsonObj
      })
    })
    .catch((err) => {
      console.log("Error : : : ", err);
      res.send({
        success: false,
        data: err
      })
    })
});


app.use('/upload-csv', router);

// Start server
function startServer() {
  server.listen(port, function () {
    console.log('Express server listening on ', port);
  });
}

setImmediate(startServer);
