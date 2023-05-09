import { type Request, type Response } from 'express'
// import { ObjectId } from 'mongodb'
import type detailInput from '../model/detailModel'
import { detailPage } from '../model/detailModel'
import allDetailMethods from '../services/detailService'
const createDetail = async (req: Request, res: Response): Promise<void> => {
  const { name, age, dob, address, phoneno, location } = req.body as {
    name: string
    age: number
    dob: string
    address: string
    phoneno: number
    location: string
  }

  if (
    name === undefined ||
    age === undefined ||
    dob === undefined ||
    address === undefined ||
    phoneno === undefined ||
    location === undefined
  ) {
    res.status(400).send({ message: 'content can not be empty' })
  }

  const addedDetails: detailInput = {
    name,
    age,
    dob,
    address,
    phoneno,
    location
  }
  try {
    const result = await detailPage.insertOne(addedDetails)
    res.status(200).send(result)
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

const getAllDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const details = detailPage.find()
    const customerDetails = await details.toArray()
    res.status(200).send(customerDetails)
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}
const updateDetail = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const { name, age, dob, address, phoneno, location } = req.body

  if (
    name === undefined ||
    age === undefined ||
    dob === undefined ||
    address === undefined ||
    phoneno === undefined ||
    location === undefined
  ) {
    res.status(400).json({ message: 'the fields are required' })
    return
  }
  try {
    const update = await allDetailMethods.updateDetailService(id, req.body)
    res.status(200).send(update)
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

const deleteAddedDetails = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const detailDelete = await allDetailMethods.deleteDetailService(id)
    res.status(200).send(detailDelete)
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

const allExports = {
  createDetail,
  getAllDetails,
  updateDetail,
  deleteAddedDetails
}

export default allExports
