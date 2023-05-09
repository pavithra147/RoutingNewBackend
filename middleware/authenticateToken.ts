/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
interface tokenInterface extends Request {
  emailId?: string
}
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization?.split(' ')[1]
  const token = authHeader
  if (token == null) {
    res.status(401)
    return
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({
          message: 'Invalid Token'
        })
        return
      }

      (req as tokenInterface).emailId = decoded.emailId
      next()
    }
  )
}
