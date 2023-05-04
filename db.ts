import { Collection, ConnectOptions, Document, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "/home/asplap3256/Documents/RoutingBackendNew/.env" });

const uri: string = process.env.DATABASE_URL!;
let client;
let collection: Collection<Document>;
let detailCollection: Collection<Document>;
let loginCollection: Collection<Document>;
async function connect() {
  client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  } as ConnectOptions);
  const db = client.db();
  collection = db.collection("signUpdetail");
  detailCollection = db.collection("detail");
  loginCollection = db.collection("loginDetail");
}

export { connect, collection, detailCollection, loginCollection };
