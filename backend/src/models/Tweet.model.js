const { default: mongoose, Schema, model, mongo } = require("mongoose");

const tweetSchema = new Schema({
    text: String
})

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet