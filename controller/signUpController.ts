import { Request, Response } from "express";
import { collection, connect } from "../db";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import signUp from "../model/signUpModel";

const signUpDetail = async (req: Request, res: Response) => {
  const { userName, emailId, password, role, imageData } = req.body;
  if (!userName || !emailId || !password || !role || !imageData) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const details: signUp = {
    userName,
    emailId,
    password: hashedPassword,
    role,
    imageData,
  };
  try {
    await connect();
    const result = await collection.insertOne(details);
    //console.log(`Inserted document with _id: ${result.insertedId}`);
    res.status(200).send(result);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};

const getSignUpDetails = async (req: Request, res: Response) => {
  try {
    await connect();
    const get = await collection.find();
    const getAll = await get.toArray();
    res.status(200).send(getAll);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

const deleteDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await connect();
    const deleteDetail = collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send(deleteDetail);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

const combinedExports = {
  signUpDetail,
  getSignUpDetails,
  deleteDetails,
};

export default combinedExports;
