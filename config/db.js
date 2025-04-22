import mongoose from 'mongoose';

const connectDatabase = async ()=> {
  mongoose.connection.on('connected', ()=> console.log('Database connected successfully!!!'))
  await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}


export default connectDatabase;