const express = require('express')
const router = require('./router/index');
const bodyParser = require('body-parser');
const app = express();
const io = require('socket.io').listen(app.listen(3000));
// import createRouter from './router'
// import { createStreamingService, createSummarizerService } from './services'
//
// // this creates our server
// const app = express()
//
// // create our microservices here
// /* FILL IN */
// const streamingService = createStreamingService()
// const summarizerService = createSummarizerService()
//
// // create our router middleware
// /* FILL IN */
// const router = createRouter()


// every request goes through the router
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

// router.init();

io.on('connection', function (socket) {
  console.log('connected to socket');
});

app.set('io', io);

// app.listen(3000, () => {
//   console.log('Listening on port 3000')
// });

// const io = require('socket.io')(server);

// app.io = io;

module.exports = app;
