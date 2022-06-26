const { default: mongoose } = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => console.log("DB IS CONNECTED"))
    .catch((err) => console.error(err));
};

module.exports = connectDB;
