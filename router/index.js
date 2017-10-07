import { Router } from 'express'

// import other routers here:
/* FILL IN */
import createStreamingRouter from './streaming'
import createSummarizerRouter from './summarizer'

export default () => {
  const router = Router()

  // put endpoints here
  /* FILL IN */
  router.use('/stream', createStreamingRouter())
  router.use('/summarize', createSummarizerRouter())

  return router
}
