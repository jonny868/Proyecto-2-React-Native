import {} from 'dotenv/config.js'
import express from "express";
import * as connectDB from'./config/db.js'

console.log(process.env.PORT);
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("App listening on port " + PORT);
  }
});

connectDB()