const express = require('express')
const router = require('./router/index');
const bodyParser = require('body-parser');
const app = express();
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

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = app;
