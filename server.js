import express from 'express'
import createRouter from './router'
import { createStreamingService, createSummarizerService } from './services'

// this creates our server
const app = express()

// create our microservices here
/* FILL IN */
const streamingService = createStreamingService()
const summarizerService = createSummarizerService()

// create our router middleware
/* FILL IN */
const router = createRouter()


// every request goes through the router
app.use('/', router)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
