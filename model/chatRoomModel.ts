import { type Collection, MongoClient, type MongoClientOptions } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config({ path: '/home/asplap3256/Documents/RoutingNewBackend/.env' })
const uri: string | undefined = process.env.DATABASE_URL
let client
let messageRoom: Collection
async function connect (): Promise<void> {
  if (uri == null) {
    throw new Error('No database URI specified')
  }
  client = await MongoClient.connect(uri, {} satisfies MongoClientOptions)
  const db = client.db()
  messageRoom = db.collection('chatRoom')
}
void connect()

export default interface conversation {
  senderId: string
  receiverId: string
  message: string[]
  roomId: string
  createdAt: Date
}

export { messageRoom }
