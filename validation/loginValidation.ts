import joi from 'joi'
import type login from '../model/loginModel'
const loginSchema = joi.object<login>({
  emailId: joi.string().required(),
  password: joi.string().required()
})
export default loginSchema
