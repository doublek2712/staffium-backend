'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

class MongoDB {
  constructor() {
    this.connect();
  }

  async connect() {
    await mongoose
      .connect(process.env.MONGO_CONNECTION_STR)
      .then((_) => console.log(`Connected to MongoDB`))
      .catch((error) =>
        console.log(`Failed to connect to MongoDB with error: ${error}`)
      );
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDB();
    }
    return this.instance;
  }
}

module.exports = MongoDB.getInstance();