import { type Request, type Response } from 'express'
import allMethods from '../services/signUpService'
const signUpDetail = async (req: Request, res: Response): Promise<void> => {
  const { userName, emailId, password, role, imageData } = req.body
  if (
    userName === undefined ||
    emailId === undefined ||
    password === undefined ||
    role === undefined ||
    imageData === undefined
  ) {
    res.status(400).send({ message: 'Content can not be empty' })
    return
  }
  try {
    const result = await allMethods.signUpForCreate({ userName, emailId, password, role, imageData })
    res.status(200)
    res.send(result)
    console.log(result)
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

const combinedExports = {
  signUpDetail,
  getSignUpDetail,
  deleteDetails
}

export default combinedExports
