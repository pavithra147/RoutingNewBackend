import { Request, Response } from "express";
import { collection } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const loginDetails = async (req: Request, res: Response) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    return res.status(400).json({ message: "EmailId or Password not present" });
  }
  try {
    const user = await collection.findOne({ emailId: req.body.emailId });
    if (!user) {
      res
        .status(401)
        .json({ message: "Login not Successful", error: "Incorrect emailId" });
    }
    const passwordMatches = await bcrypt.compare(password, user?.password);
    if (!passwordMatches) {
      res
        .status(401)
        .json({ message: "Login not Successful", error: "Incorrect Password" });
    } else {
      const email = req.body.emailId;
      const token = jwt.sign(
        { emailId: email },
        process.env.JWT_SECRET as string,
        { expiresIn: "5h" }
      );

      res.json({
        token: token,
        message: "Login Successful",
        data: user?.userName,
        role: user?.role,
        image: user?.imageData,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
export { loginDetails };
