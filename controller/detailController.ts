import { Request, Response } from "express";
import {  detailCollection } from "../db";
import { ObjectId } from "mongodb";
import detailInput from "../model/detailModel";
const createDetail = async (req: Request, res: Response) => {
  const { name, age, dob, address, phoneno, location } = req.body;
  if (!name || !age || !dob || !address || !phoneno || !location) {
    res.status(400).send({ message: "content can not be empty" });
    return;
  }
  const addedDetails: detailInput = {
    name,
    age,
    dob,
    address,
    phoneno,
    location,
  };
  try {
    const result = await detailCollection.insertOne(addedDetails);
    res.status(200).send(result);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};

const getAllDetails = async (req: Request, res: Response) => {
  try {
    const details = await detailCollection.find();
    const customerDetails = await details.toArray();
    res.status(200).send(customerDetails);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};

const updateDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, age, dob, address, phoneno, location } = req.body;

  if (!name || !age || !dob || !address || !phoneno || !location) {
    return res.status(422).json({ message: "the fields are required" });
  }

  try {
    const update = await detailCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, age, dob, address, phoneno, location } }
    );
    res.status(200).send(update);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};

const allExports = {
  createDetail,
  getAllDetails,
  updateDetail,
};

export default allExports;
