const Post = require('../models/Post')

module.exports.list = (req, res) => {
    Post.find()
        .then(posts => res.send(posts))
        .catch(err => res.send(err))
}

module.exports.indivisualList = (req, res) => {
    const _id = req.user._id
    Post.find({user: _id})
        .then(posts => res.send(posts))
        .catch(err => res.send(err))
}
module.exports.create = (req, res) => {
    const body = req.body
    body.user = req.user._id
    const post = new Post(body)
    post.save()
        .then(post => res.send(post))
        .catch(err => res.send(err))
}

module.exports.show = (req, res) => {
    const _id = req.params.id
    Post.findOne({_id})
        .then(post => {
            if(post) {
                res.send(post)
            } else {
                res.send({})
            }
        })
        .catch(err => res.send(err))
}

module.exports.update = (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    const { body } = req
    body.user = userId
    Post.findOne({_id})
        .then(post => {
            if(post) {
                // if(body.title) { // userId == user giving false despite having same string
                //     const user = post.user
                //     console.log('userId', userId)
                //     console.log('post.user', user)
                //     console.log(userId == user)
                //     if(userId == user) {
                //         console.log('in the game')
                //         post.title = body.title
                //     } else {
                //         res.send('you can\'t change the title')
                //     }
                // } else {
                //     res.send('not body.title')
                // }
                console.log(post, body)
                if(body.comment){
                    const comment = {}
                    comment.comment = body.comment
                    comment.user = userId
                    post.comments.push(comment)
                } 
                if(body.rating){
                    const rating = {}
                    rating.rating = body.rating
                    rating.user = userId
                    post.score.push(rating)
                } 
                // post.comments.push(body)
                // res.send({message: 'in the process'})
                return post.save()
            } else {
                res.send({})
            }
        })
        .then(product => res.send(product))
        .catch(err => res.send(err))
}