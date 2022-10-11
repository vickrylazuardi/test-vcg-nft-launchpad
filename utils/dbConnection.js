import { MongoClient } from 'mongodb';

exports.getHistory = async () => {
  try {
    const url = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    const collectionName = process.env.COLLECTION_NAME;
    const client = new MongoClient(url);

    await client.connect()
    // .then(console.log("Connected to the server"));
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection.find({ tokenId: 2400 });
  } catch (err) {
    console.log('error->', err);
  }
};


exports.closeDb = async () => {
  await client.close();
};
