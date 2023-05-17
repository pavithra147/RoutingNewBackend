import joi from 'joi'
import type signUp from '../model/signUpModel'
const signUpSchema = joi.object<signUp>({
  userName: joi.string().required(),
  emailId: joi.string().email().lowercase().required(),
  password: joi.string().required(),
  role: joi.string().required(),
  imageData: joi.string().required()
})
export default signUpSchema
