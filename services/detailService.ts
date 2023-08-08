import {
  ObjectId,
  type InsertOneResult,
  type UpdateResult,
  type DeleteResult
} from 'mongodb'
import { detailPage } from '../model/detailModel'
import type detailInput from '../model/detailModel'

const createDetailService = async (
  detail: detailInput
): Promise<InsertOneResult<Document>> => {
  const listOfDetails: detailInput = detail
  try {
    const insertDetails = await detailPage.insertOne(listOfDetails)
    return insertDetails
  } catch (error: any) {
    throw new Error('Unable to create details')
  }
}

const getDetail = async (): Promise<detailInput[]> => {
  try {
    const detailList = detailPage.find().toArray()
    const details: detailInput[] = (await detailList).map((user) => ({
      _id: user._id,
      name: user.name,
      age: user.age,
      dob: user.dob,
      address: user.address,
      phoneno: user.phoneno,
      location: user.location,
      likesCount: user.likesCount
    }))
    return details
  } catch (error: any) {
    throw new Error('Unable to get added details')
  }
}

const updateDetailService = async (
  id: string,
  { name, age, dob, address, phoneno, location }: detailInput
): Promise<UpdateResult<Document>> => {
  try {
    const update = await detailPage.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, age, dob, address, phoneno, location } }
    )
    return update
  } catch (error: any) {
    throw new Error('Unable to update added details')
  }
}

const deleteDetailService = async (id: string): Promise<DeleteResult> => {
  try {
    const deleteUser = detailPage.deleteOne({ _id: new ObjectId(id) })
    return await deleteUser
  } catch (error: any) {
    throw new Error(error)
  }
}

const allDetailMethods = {
  createDetailService,
  getDetail,
  updateDetailService,
  deleteDetailService
}

export default allDetailMethods
