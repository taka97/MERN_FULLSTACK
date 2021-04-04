const dg = require('debug')('MERN:mongoose');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustermain.mp0ye.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );

    dg('MongoDB connected');
  } catch (error) {
    dg(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
