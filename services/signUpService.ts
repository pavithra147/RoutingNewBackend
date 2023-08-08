import { signUpCollection } from '../model/signUpModel'
import type signUp from '../model/signUpModel'
import { ObjectId, type DeleteResult, type InsertOneResult } from 'mongodb'

const signUpForCreate = async (
  user: signUp
): Promise<InsertOneResult<Document>> => {
  const details: signUp = user
  try {
    const result = signUpCollection.insertOne(details)
    return await result
  } catch (error: any) {
    throw new Error('Unable to sign up user')
  }
}

const getSignUpDetails = async (): Promise<signUp[]> => {
  try {
    const getDetails = signUpCollection.find().toArray()
    const signUpDetails: signUp[] = (await getDetails).map((detail) => ({
      _id: detail._id,
      userName: detail.userName,
      emailId: detail.emailId,
      password: detail.password,
      role: detail.role,
      imageData: detail.imageData
    }))
    return signUpDetails
  } catch (error: any) {
    throw new Error('Unable to get sign up user detail')
  }
}

const deleteFromDatabase = async (id: string): Promise<DeleteResult> => {
  try {
    const deleteUser = signUpCollection.deleteOne({ _id: new ObjectId(id) })
    return await deleteUser
  } catch (error: any) {
    throw new Error('Unable to delete')
  }
}

const signUpDetailsExceptUserID = async (id: string): Promise<signUp[]> => {
  try {
    const signUpDetails = await signUpCollection.find({ _id: { $ne: new ObjectId(id) }, role: { $ne: 'Admin' } }).toArray()
    console.log(signUpDetails)
    return signUpDetails as signUp[]
  } catch {
    console.log(Error)
    throw new Error('Unable to get details')
  }
}
const allMethods = {
  signUpForCreate,
  getSignUpDetails,
  deleteFromDatabase,
  signUpDetailsExceptUserID
}

export default allMethods
