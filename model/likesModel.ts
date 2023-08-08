import { type Collection, MongoClient, type MongoClientOptions } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config({ path: '/home/asplap3256/Documents/RoutingNewBackend/.env' })
const uri: string | undefined = process.env.DATABASE_URL
let client
let likes: Collection
async function connect (): Promise<void> {
  if (uri == null) {
    throw new Error('No database URI specified')
  }
  client = await MongoClient.connect(uri, {} satisfies MongoClientOptions)
  const db = client.db()
  likes = db.collection('like')
}
void connect()
export { likes }
export interface likesCount {
  counts: number
}
