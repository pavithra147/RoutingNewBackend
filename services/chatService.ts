import { roomIds } from '../model/chatModel'
import { messageRoom } from '../model/chatRoomModel'
const post = async (ids: string, userIds: string): Promise<any> => {
  try {
    const createdAt = new Date()
    const existingDocument = await roomIds.findOne({
      members: { $all: [ids, userIds] }
    })
    console.log(existingDocument)

    if (existingDocument != null) {
      console.log('Document already exists')
      const existing = {
        insertedId: existingDocument._id.toString(),
        members: [
          {
            id: ids,
            userId: userIds
          }
        ],
        createdAt
      }
      return existing
    } else {
      const insertId = await roomIds.insertOne({
        members: [
          ids,
          userIds
        ],
        createdAt
      })
      const insertedResult = insertId.insertedId

      const modifiedDocument = {
        insertedId: insertedResult.toString(),
        members: [
          {
            id: ids,
            userId: userIds
          }
        ],
        createdAt
      }
      return modifiedDocument
    }
  } catch (error: any) {
    console.error('Error fetching user details:', error)
    return error.message
  }
}

async function chatRoom (io: any, socket: any, data: any): Promise<any> {
  try {
    const createdAt = new Date()
    data.createdAt = createdAt
    await messageRoom.insertOne(data)
    const oldmessages = await messageRoom.find({ roomId: data.roomId }).toArray()
    // console.log('doubt', oldmessages)

    return io.emit('create', oldmessages)
  } catch (error: any) {
    console.error('Error fetching user details:', error)
    return error.message
  }
}

async function retrieveinitialMesssages (io: any, socket: any, id: any): Promise<any> {
  console.log(id)
  const initialMessage = await messageRoom.find({ roomId: id }).toArray()
  console.log('message', initialMessage)
  return io.emit('previousMessage', initialMessage)
}
const allFunctions = {
  post,
  chatRoom,
  retrieveinitialMesssages
}
export default allFunctions
