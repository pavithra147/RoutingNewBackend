// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
import { type NextFunction } from 'express'
import { detailPage } from '../model/detailModel'
import { ObjectId } from 'mongodb'

// }
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function message (io: any, counts: any, id: any) {
  console.log(id)
  // try {
  //   const count = await detailPage.updateOne({ _id: new ObjectId(id) }, { $set: { likesCount: counts } })
  //   console.log(count)
  //   const updatedDoc = await detailPage.findOne({ _id: new ObjectId(id) }, { projection: { likesCount: 1 } })
  //   const likesCount = updatedDoc?.likesCount
  //   console.log(likesCount > 1)
  //   if (likesCount !== undefined && likesCount > 1) {
  //     const resetCount = await detailPage.updateOne({ _id: new ObjectId(id) }, { $set: { likesCount: 0 } })
  //     console.log(resetCount)
  //     const reset = await detailPage.findOne({ _id: new ObjectId(id) }, { projection: { likesCount: 1 } })
  //     const resetLikesCount = reset?.likesCount
  //     console.log(resetLikesCount)
  //     io.emit('likes', resetLikesCount)
  //   } else {
  //     console.log(likesCount)
  //     io.emit('likes', likesCount)
  //   }
  // } catch (error) {
  //   console.error('Error updating likes:', error)
  // }
  try {
    const countLikes = await detailPage.findOne({ _id: new ObjectId(id) }, { projection: { likesCount: 1 } })
    console.log(countLikes?.likesCount)
    if (countLikes?.likesCount === undefined || countLikes.likesCount === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const update = await detailPage.updateOne({ _id: new ObjectId(id) }, { $set: { likesCount: 1 } })
      const updatedLikes = await detailPage.findOne({ _id: new ObjectId(id) }, { projection: { likesCount: 1 } })
      io.emit(updatedLikes)
    } // else {
    //   await detailPage.updateOne({ _id: new ObjectId(id) }, { $set: { likesCount: 0 } })
    //   const like = await detailPage.findOne({ _id: new ObjectId(id) }, { projection: { likesCount: 1 } })
    //   io.emit(like)
    // }
  } catch (error) {

  }
}
export { message }
