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