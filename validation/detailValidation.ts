import joi from 'joi'
import type detailInput from '../model/detailModel'
const schema = joi.object<detailInput>({
  name: joi.string().required(),
  age: joi.number().required(),
  dob: joi.string().required(),
  address: joi.string().required(),
  phoneno: joi.number().required(),
  location: joi.string().required()
})
export default schema
