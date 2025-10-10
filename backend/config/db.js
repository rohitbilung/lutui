const mongoose = require('mongoose')
const logger = require('../logger')

mongoose.set('debug', true)

async function connectDB() {
    try {
      const conn = await mongoose.connect(process.env.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      logger.error(`DB Connection Error: ${error} `)
      console.error(error);
      process.exit(1);
    }
  }
  
  connectDB();