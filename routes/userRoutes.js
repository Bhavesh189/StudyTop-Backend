const express = require('express')
const router = express.Router();
const {getUsers, create, login, checkUser, getName, logout} = require('../controllers/userControllers.js')

router.get('/users', getUsers)
router.post('/create', create)
router.post('/login', login)
router.get('check', checkUser)
router.get('/getName', getName)
router.get('/logout', logout)

module.exports = router;