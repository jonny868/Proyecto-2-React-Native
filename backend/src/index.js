require("dotenv").config();
const {ApolloServer} = require('apollo-server-express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const {typeDefs} = require('./graphql/typeDefs')
const {resolvers} = require('./graphql/resolvers.js')
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./database");
const cors = require('cors')
const routes = require("./routes/routes");


//initializers
const app = express();
connectDB();

//settings
app.set("port", process.env.PORT || 3000);

const schema = buildSchema(`
type Query {
  hello: String
}
`);

//middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use(routes);
app.use(cors());
app.use(routes);



module.exports = app;


app.use('/graphql',graphqlHTTP({
  schema,rootValue:resolvers,graphiql: { headerEditorEnabled: true }
}));

app.listen(app.get("port"), () =>
console.log(`app listening on port ${app.get("port")}!`)
);


