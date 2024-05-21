import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectionString = `mongodb://salvy_db:27017/Salvy`

const options: mongoose.ConnectOptions = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

//db connection
export const db = mongoose.connect(connectionString, options)
  .then(res => {
    if (res) {
      console.log(`Database connection succeffully to SalvyDB`)
    }
  }).catch(err => {
    console.log(err)
  })