/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { loginDetails } from '../controller/loginController'

const loginRoute = () => {
  const router = Router()

  router.post('/login', loginDetails)

  return router
}
export { loginRoute }
