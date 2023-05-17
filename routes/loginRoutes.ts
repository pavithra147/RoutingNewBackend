/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  type NextFunction,
  Router,
  type Request,
  type Response
} from 'express'
import { loginDetails } from '../controller/loginController'
import loginSchema from '../validation/loginValidation'

const loginRoute = () => {
  const router = Router()
  const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body)
    if (error != null) {
      return res.status(400).send({ message: 'contents cannot be empty' })
    }
    next()
  }
  router.post('/login', validateRequest, loginDetails)

  return router
}
export { loginRoute }
