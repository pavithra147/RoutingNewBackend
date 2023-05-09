import { type Collection, MongoClient, type MongoClientOptions } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config({ path: '/home/asplap3256/Documents/RoutingNewBackend/.env' })
const uri: string | undefined = process.env.DATABASE_URL
let client
let detailPage: Collection
async function connect (): Promise<void> {
  if (uri == null) {
    throw new Error('No database URI specified')
  }
  client = await MongoClient.connect(uri, {} satisfies MongoClientOptions)
  const db = client.db()
  detailPage = db.collection('detail')
}
void connect()
export { detailPage }

export default interface detailInput {
  name: string
  age: number
  address: string
  dob: string
  phoneno: number
  location: string
}
