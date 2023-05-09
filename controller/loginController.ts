import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import loginDetailsService from '../services/loginService'

const loginDetails = async (req: Request, res: Response): Promise<void> => {
  const { emailId, password } = req.body as { emailId: string, password: string }
  if (emailId === undefined || password === undefined) {
    res.status(400).json({ message: 'EmailId or Password not present' })
    return
  }
  try {
    // const user = await signUpCollection.findOne({ emailId: req.body.emailId })
    const [user] = await loginDetailsService({ emailId, password })
    if (user === undefined) {
      res
        .status(401)
        .json({ message: 'Login not Successful', error: 'Incorrect emailId' })
      return
    }
    const passwordMatches = await bcrypt.compare(password, user?.password)
    if (!passwordMatches) {
      res
        .status(401)
        .json({ message: 'Login not Successful', error: 'Incorrect Password' })
      return
    } else {
      const email = req.body.emailId
      const token = jwt.sign(
        { emailId: email },
        process.env.JWT_SECRET as string,
        { expiresIn: '5h' }
      )

      res.json({
        token,
        message: 'Login Successful',
        data: user?.userName,
        role: user?.role,
        image: user?.imageData
      })
      return
    }
  } catch (error: any) {
    res.status(400).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}
export { loginDetails }
