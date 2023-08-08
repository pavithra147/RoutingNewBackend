import type signUp from '../model/signUpModel'
import { signUpCollection } from '../model/signUpModel'
import type login from '../model/loginModel'

const loginDetailsService = async ({
  emailId,
  password
}: login): Promise<signUp[]> => {
  try {
    const userDetails = await signUpCollection.findOne({ emailId })
    if (userDetails === undefined) {
      throw new Error('User not found')
    }
    const user: signUp[] = [
      {
        _id: userDetails?._id,
        userName: userDetails?.userName,
        emailId: userDetails?.emailId,
        password: userDetails?.password,
        role: userDetails?.role,
        imageData: userDetails?.imageData
      }
    ]
    // const user: signUp[] = userDetails?.map((userDetails: any) => {
    //   _id: userDetails?._id
    //   userName: userDetails?.userName
    //   emailId: userDetails?.emailId
    //   password: userDetails?.password
    //   role: userDetails?.role
    //   imageData: userDetails?.imageData
    // })
    return user
  } catch (error: any) {
    throw new Error('Unable to login')
  }
}
export default loginDetailsService
