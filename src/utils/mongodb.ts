import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_URI ?? "";

const _client: MongoClient = new MongoClient(uri);

// connectDB connects to provided uri Mongo Database
async function connectDB() {
  await _client.connect();
}
connectDB();

/**
 *  returns Db instance of provided Database Name
 *
 * @param dbName Database name
 * @returns Db instance
 */
export function getDB(dbName: string) {
  return _client.db(dbName);
}
