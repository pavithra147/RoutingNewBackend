/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  type NextFunction,
  Router,
  type Request,
  type Response
} from 'express'
import combinedExports from '../controller/signUpController'
import signUpSchema from '../validation/signUpValidation'

const signUpRoute = () => {
  const router = Router()
  const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = signUpSchema.validate(req.body)
    if (error != null) {
      return res.status(400).send({ message: 'contents cannot be empty' })
    }
    next()
  }
  router.post('/register', validateRequest, combinedExports.signUpDetail)
  router.get('/register', combinedExports.getSignUpDetail)
  router.delete('/register/:id', combinedExports.deleteDetails)
  router.get('/signUp/:id', combinedExports.registerDetails)
  return router
}

export { signUpRoute }
