const Stream = require('../utils/stream');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

// const summarizer = new Summarizer();
const stream = new Stream();

router.get('/stream/start', async function(req, res, next) {
    stream.startRecording();
    return res.status(200).send('hello');
});

router.post('/stream/stop', async function(req, res, next) {
    stream.stopRecording();
    return res.status(200);
});

router.post('/handleText', async function(req, res, next) {
  console.log(req.body);
  return res.status(200);
});

module.exports = router;
