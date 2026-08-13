const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not set in environment');
  }
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const dbName = mongoose.connection.name || uri.split('/').pop();
    console.log(`MongoDB connected to ${dbName}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    throw err;
  }
};

module.exports = connectDB;
