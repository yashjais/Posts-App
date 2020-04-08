const multer = require('multer')
const path = require('path')
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

    // Set Storage Engine
    const storage = multer.diskStorage({
        destination: './public/uploads',
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))        
        }
    })

    // init Upload
    const upload = multer({
        storage: storage
    }).single('myImage')

    
    upload(req, res, (err) => {
        if(err) {
            // console.log(err)
        } else {
            if(req.file){
                const body = {}
                body.title = req.body.title
                body.user = req.user._id
                body.image = `uploads/${req.file.filename}`
                const post = new Post(body)
                // console.log(body)
                post.save()
                    .then(post => res.send(post))
                    .catch(err => res.send(err))
                // res.send(`uploads/${req.file.filename}`)
            } else {
                
                res.send('no image found')
            }
        }
    })
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
                    console.log('userId', userId)
                    console.log('post.user', user)
                    console.log(userId == user)
                //     if(userId == user) {
                        console.log('in the game')
                //         post.title = body.title
                //     } else {
                //         res.send('you can\'t change the title')
                //     }
                // } else {
                //     res.send('not body.title')
                // }
                // console.log(post, body)
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