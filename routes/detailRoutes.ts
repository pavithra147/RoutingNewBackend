/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import allExports from '../controller/detailController'
import { authenticateToken } from '../middleware/authenticateToken'
const detailRoute = () => {
  const router = Router()
  router.post('/details', authenticateToken, allExports.createDetail)
  router.get('/details', authenticateToken, allExports.getAllDetails)
  router.put('/details/:id', authenticateToken, allExports.updateDetail)
  router.delete('/details/:id', authenticateToken, allExports.deleteAddedDetails)
  return router
}
export { detailRoute }
