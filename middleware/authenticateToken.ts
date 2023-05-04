import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface tokenInterface extends Request {
  emailId?: string;
}
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization?.split(" ")[1];
  const token = authHeader;
  if (token == null) {
    return res.status(401);
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      (req as tokenInterface).emailId = decoded.emailId;
      next();
    }
  );
};
