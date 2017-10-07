const Stream = require('../utils/stream');
const express = require('express');
const path = require('path')

const router = express.Router();



// const summarizer = new Summarizer();
const stream = new Stream();

router.post('/stream/start', async function(req, res, next) {
    stream.startRecording();
    return res.status(200).send('hello');
});

// router.get('/', function(req, res){
//     return res.status(200).send('hello');
// });

router.post('/stream/stop', async function(req, res, next) {
    stream.stopRecording();
    return res.status(200);
});

router.get('/live', async function(req, res, next) {
   return res.status(200).sendFile(path.resolve('views/live.html'));
});

router.post('/handleText', async function(req, res, next) {
  const text = req.body;
  console.log(`Text received at handleText: ${JSON.stringify(text)}`);
  const io = req.app.get('io');
  io.emit('text', text);
  return res.status(200);
});




module.exports = router;
