/* eslint-disable no-console */

import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then((db) => ('database connection established'))
  .catch((error) => console.error(error))
}

export {connectDB}