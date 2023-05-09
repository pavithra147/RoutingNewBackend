/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import combinedExports from '../controller/signUpController'

const signUpRoute = () => {
  const router = Router()
  router.post('/register', combinedExports.signUpDetail)
  router.get('/register', combinedExports.getSignUpDetail)
  router.delete('/register/:id', combinedExports.deleteDetails)
  return router
}

export { signUpRoute }
