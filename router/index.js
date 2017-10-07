const Stream = require('../utils/stream');
const express = require('express');

const router = express.Router();


router.get('/stream', async function(req, res, next) {
    const stream = new Stream();
    stream.startRecording();
    return res.status(200).send('hello');
});

module.exports = router;
