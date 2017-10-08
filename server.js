const express = require('express')
const router = require('./router/index');
const bodyParser = require('body-parser');
const app = express();
const io = require('socket.io').listen(app.listen(3000));
const Lecture = require('./utils/lecture');
const winston = require('winston');

// every request goes through the router
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

winston.add(
  winston.transports.File, {
    filename: './history.log',
    level: 'info',
    json: true,
    eol: 'n', // for Windows, or `eol: ‘n’,` for *NIX OSs
    timestamp: true
  }
)

app.use('/', router);

io.on('connection', function (socket) {
  console.log('connected to socket');
  winston.info('connected to socket')
});

app.set('io', io);



module.exports = app;
