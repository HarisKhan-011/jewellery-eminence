require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { secret } = require('./secret');

mongoose.set('strictQuery', false);

const MONGO_URI = secret.db_url;
let localMongoServer;

const isLocalMongoUri = (uri = '') =>
  uri.includes('localhost') || uri.includes('127.0.0.1');

const getMongoDbName = (uri = '') => {
  try {
    const dbName = new URL(uri).pathname.replace('/', '');
    return dbName || 'harri';
  } catch (_) {
    return 'harri';
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('mongodb connection success!');
  } catch (err) {
    if (!isLocalMongoUri(MONGO_URI)) {
      console.log('mongodb connection failed!', err.message);
      throw err;
    }

    console.log('local mongodb not available, starting embedded mongodb...');

    const dbPath = path.join(process.cwd(), '.mongodb-data');
    fs.mkdirSync(dbPath, { recursive: true });

    localMongoServer = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: getMongoDbName(MONGO_URI),
        dbPath,
        storageEngine: 'wiredTiger',
      },
    });

    await mongoose.connect(MONGO_URI);
    console.log('embedded mongodb connection success!');
  }
};

module.exports = connectDB;
