/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { type NextFunction, Router, type Request, type Response } from 'express'
import allExports from '../controller/detailController'
import { authenticateToken } from '../middleware/authenticateToken'
import schema from '../validation/detailValidation'
const detailRoute = (): Router => {
  const router = Router()
  const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error != null) {
      return res.status(400).send({ message: 'contents cannot be empty' })
    }
    next()
  }
  router.post('/details', authenticateToken, validateRequest, allExports.createDetail)
  router.get('/details', authenticateToken, allExports.getAllDetails)
  router.put('/details/:id', authenticateToken, allExports.updateDetail)
  router.delete('/details/:id', authenticateToken, allExports.deleteAddedDetails)
  return router
}
export { detailRoute }
