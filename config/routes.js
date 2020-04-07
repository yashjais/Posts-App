const express = require('express')
const router = express.Router()

const authenticateUser = require('../app/middlewares/authentication')
const usersController = require('../app/controllers/UsersController')
const postController = require('../app/controllers/postsController')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account',authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

router.get('/posts',authenticateUser, postController.list)
router.get('/posts/:id',authenticateUser, postController.show) // post showing alone
router.get('/posts-individual',authenticateUser, postController.indivisualList) // posts of a specific user
router.post('/posts',authenticateUser, postController.create)
router.put('/posts/:id',authenticateUser, postController.update)

module.exports = router