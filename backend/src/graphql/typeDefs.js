const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Tweet {
        _id: ID,
        text: String
    }
    type Query {
        getTweets:[Tweet]
    }
    # schema{
    #     query: Query
    # }
`;

module.exports = { typeDefs };
