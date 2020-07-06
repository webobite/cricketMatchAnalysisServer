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
router.post('/upload-csv', upload.single('file'), function async(req, res) {
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

  /**
   * Route to analyse and Find answer of following questions : 
   *  - Top 5 T20 Batsman : Virat, Rohit, Shikhar, Sachin
   *  - Top 5(Highest Average in tests) : Dravid, P2, P3, P4, P5
   *  - Top 5 (Total Runs in one day): Sachin, Virat, P3, P4, P5
   */
  router.post('/analyse', upload.single('file'), function async(req, res) {
    csv().fromFile(req.file.path)
      .then((jsonObj) => {
        console.log("Json Obj : : : ", jsonObj);
        fs.unlinkSync(req.file.path); 
        var query = {
            query1 : [],
            query2 : [],
            query3 : []
        }  // remove temp file process "fileRows" and respond
        res.send({
          success: true,
          data: query,
          message : {
              query1 : "Top 5 T20 Batsman",
              query2 : "Top 5(Highest Average in tests)",
              query3 : "Top 5 (Total Runs in one day)"
          }
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