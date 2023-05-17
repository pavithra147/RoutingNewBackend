import { type Request, type Response } from 'express'
import allDetailMethods from '../services/detailService'
const createDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await allDetailMethods.createDetailService(req.body)
    res.status(200).send(result)
    return
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

const getAllDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerDetails = await allDetailMethods.getDetail()
    res.status(200).send(customerDetails)
    return
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

const deleteAddedDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const detailDelete = await allDetailMethods.deleteDetailService(id)
    res.status(200).send(detailDelete)
    return
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
