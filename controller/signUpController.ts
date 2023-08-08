import { type Request, type Response } from 'express'
import allMethods from '../services/signUpService'
import bcrypt from 'bcryptjs'
const signUpDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPassword
    const result = await allMethods.signUpForCreate(req.body)
    res.status(200)
    res.send(result)
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

const getSignUpDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const get = await allMethods.getSignUpDetails()
    res.status(200).send(get)
  } catch (err: any) {
    res.status(500).send({ message: err.message })
  }
}

const deleteDetails = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const deleteDetail = await allMethods.deleteFromDatabase(id)
    res.status(200).send(deleteDetail)
  } catch (err: any) {
    res.status(500).send({ message: err.message })
  }
}

const registerDetails = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  console.log(id)
  try {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const register = await allMethods.signUpDetailsExceptUserID(id)
    res.status(200).send(register)
  } catch (err: any) {
    res.status(500).send({ message: err.message })
  }
}

const combinedExports = {
  signUpDetail,
  getSignUpDetail,
  deleteDetails,
  registerDetails
}

export default combinedExports
