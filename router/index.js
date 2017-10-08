const Stream = require('../utils/stream');
const Slides = require('../utils/slides');
const Lecture = require('../utils/lecture');
const MLabClient = require('../utils/mlabClient')
const express = require('express');
const path = require('path');
const winston = require('winston');

const router = express.Router();

// const summarizer = new Summarizer();
const stream = new Stream();
const lecture = new Lecture();

router.get('/', async function(req, res, next) {
    return res.status(200).sendFile(path.resolve('public/index.html'));
});

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
    // try {
      winston.info('Stopping stream.');

      stream.stopRecording();
      lecture.close();
      return res.status(200);
    // } catch (err) {
      // winston.error('Failed to stop stream');
    // }
});

router.get('/live', async function(req, res, next) {
  try {
    winston.info('Connected to live stream');

    const io = req.app.get('io');
    res.status(200).sendFile(path.resolve('public/live.html'));
    setTimeout(function() {
        const data = { text: lecture.getNotes(), slidesUrl: lecture.getSlidesUrl() };
        io.emit('notes', data);
    }, 3000);

  } catch (err) {
    winston.error('Failed to connect to live stream');
  }
});

router.get('/professor', async function(req, res, next) {
  try {
    winston.info('Starting to get professor');

    return res.status(200).sendFile(path.resolve('public/professor.html'));
  } catch (err) {
    winston.error('Failed to get professor');
  }
});

router.get('/login', async function(req, res, next) {
    return res.status(200).sendFile(path.resolve('public/login.html'));
});

router.get('/create', async function(req, res, next) {
    return res.status(200).sendFile(path.resolve('public/create.html'));
});

router.post('/handleText', async function(req, res, next) {
  try {
    winston.log('Start handling text');

    const text = req.body;
    lecture.addBlock(text.text);
    console.log(`Text received at handleText: ${JSON.stringify(text)}`);
    const io = req.app.get('io');
    const textWithEntities = await lecture.generateTextWithEntities(text.text);
    console.log(`Text with entities: ${textWithEntities}`);
    io.emit('text', {text: textWithEntities});
    return res.status(200);
  } catch (err) {
    winston.error('Failed to handle text');
  }
});

router.post('/authenticate', async function(req, res, next) {
  try {
    winston.log('Start authentication');

    MLabClient.authenticateProfessor(req.body.user, req.body.password, (professor) => {
        if (professor != null) {
            lecture.addProfessor(professor);
            return res.status(200).send({success: true});
        } else {
            console.log('failure');
            return res.status(400);
        }

    });
  } catch (err) {
    winston.error('Failed to perform authentication.');
  }
});

router.post('/createProfessor', async function(req, res, next) {
  try {
    winston.log('Start create professor');

    MLabClient.createProfessor(req.body.user, req.body.password, req.body.students, (success) => {
        if (success) {
            return res.status(200).send({success: true});
        } else {
            return res.status(400);
        }

    });

  } catch (err) {
    winston.error('Failed to create professor.');
  }
});

router.post('/readSlides', async function(req, res, next) {
    const notes = [];
    const slidesUrl = req.body.slidesUrl;
    const presentationId = slidesUrl.split('/d/')[1].split('/')[0];
    console.log(presentationId);
    Slides.parseSlides(presentationId, (textNotes) => {
        lecture.addNotes(textNotes);
        lecture.addSlides(slidesUrl);
    });
    // console.log(slidesUrl);

});

router.post('/submitNotes', async function(req, res, next) {
    lecture.addNotes([req.body.text]);
});


module.exports = router;
