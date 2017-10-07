const Stream = require('../utils/stream');
const express = require('express');
const path = require('path');
const winston = require('winston');

const router = express.Router();

// const summarizer = new Summarizer();
const stream = new Stream();

router.post('/stream/start', async function(req, res, next) {
    try {
      winston.info('Starting stream');

      stream.startRecording();
      return res.status(200).send('hello');
    } catch (err) {
      winston.error('Failed to start stream');
    }
});

router.post('/stream/stop', async function(req, res, next) {
    try {
      winston.info('Stopping stream.');

      stream.stopRecording();
      return res.status(200);
    } catch (err) {
      winston.error('Failed to stop stream');
    }
});

router.get('/live', async function(req, res, next) {
  try {
    winston.info('Connected to live stream');

    return res.status(200).sendFile(path.resolve('views/live.html'));
  } catch (err) {
    winston.error('Failed to connect to live stream');
  }
});

router.get('/professor', async function(req, res, next) {
  try {
    winston.info('Starting to get professor');

    return res.status(200).sendFile(path.resolve('views/professor.html'));
  } catch (err) {
    winston.error('Failed to get professor')
  }
});

router.post('/handleText', async function(req, res, next) {
  try {
    winston.log('Start handling text');

    const text = req.body;
    console.log(`Text received at handleText: ${JSON.sstringify(text)}`);
    const io = req.app.get('io');
    io.emit('text', text);
    return res.status(200);
  } catch (err) {
    winston.error('Failed to handle text');
  }
});




module.exports = router;
