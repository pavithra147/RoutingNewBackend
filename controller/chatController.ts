import postFunction from '../services/chatService'
import { type Request, type Response } from 'express'

const postId = async (req: Request, res: Response): Promise<void> => {
  const { id, userId } = req.body
  try {
    const chat = await postFunction.post(id, userId)
    res.status(200).send(chat)
    return
  } catch (error: any) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

// const conversationRoom = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.body
//   console.log(id)
//   try {
//     const chatRoom = await postFunction.chatRoom(id)
//     res.status(200).send(chatRoom)
//     return
//   } catch (error: any) {
//     res.status(500).json({
//       message: 'An error occurred',
//       error: error.message
//     })
//   }
// }

const chatFunctions = {
  postId
// conversationRoom
}
export default chatFunctions
