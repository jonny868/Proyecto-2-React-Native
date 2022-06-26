require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./database");
const cors = require('cors')
const routes = require("./routes/routes");

connectDB();

//initializers
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use(routes);
app.use(cors());
app.use(routes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(app.get("port"), () =>
  console.log(`app listening on port ${app.get("port")}!`)
);
