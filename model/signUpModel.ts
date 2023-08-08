import { type Collection, MongoClient, type MongoClientOptions, type ObjectId } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config({ path: '/home/asplap3256/Documents/RoutingNewBackend/.env' })
const uri: string | undefined = process.env.DATABASE_URL
let client
let signUpCollection: Collection
async function connect (): Promise<void> {
  if (uri == null) {
    throw new Error('No database URI specified')
  }
  client = await MongoClient.connect(uri, {} satisfies MongoClientOptions)

  const db = client.db()
  signUpCollection = db.collection('signUpdetail')
}
void connect()
export { signUpCollection }

export default interface signUp {
  _id: ObjectId | undefined
  userName: string
  emailId: string
  password: string
  role: string
  imageData: string
}
