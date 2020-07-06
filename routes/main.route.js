const express = require('express');
const app = express();
const Router = express.Router;
const router = new Router();
const multer = require('multer');
const csv = require('csvtojson');
const upload = multer({ dest: 'tmp/csv/' });
const fs = require('fs');

router.get('/', async(req, res) => {
    res.send("Hello")
})

/**
 * Route to upload the file and same CSV will be converted 
 * into array of Objects and sent back as response.
 */
router.post('/upload-csv', upload.single('file'), function (req, res) {
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
module.exports = router