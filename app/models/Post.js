const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    author: {
        type: String
    },
    score: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: String,
            enum: [1,2,3,4,5]
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post