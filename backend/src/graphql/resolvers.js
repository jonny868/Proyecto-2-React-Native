const { get } = require('mongoose')
const Tweet = require('../models/Tweet.model')

const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        getTweets: async () => {
            const tweets = await Tweet.find();
            return tweets;
        },
        getSingleTweet:async (_, args) => {
          const tweet = await Tweet.findById(args._id)
          return tweet;
        }
    }
}