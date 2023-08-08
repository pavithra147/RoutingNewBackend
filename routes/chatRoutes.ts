/* eslint-disable @typescript-eslint/no-misused-promises */
import chatFunctions from '../controller/chatController'
import { Router } from 'express'
// import { authenticateToken } from '../middleware/authenticateToken'

const chatRoute = (): Router => {
  const router = Router()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/chat', chatFunctions.postId)
  // router.post('/joinChat', chatFunctions.conversationRoom)
  return router
}

export { chatRoute }
