const mongoose = require('mongoose')
mongoose.set('debug', true)

async function connectDB() {
    try {
      const conn = await mongoose.connect(process.env.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  
  connectDB();