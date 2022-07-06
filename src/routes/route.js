const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController')
// const bookController = require('../Controllers/bookController')

router.post("/register", userController.createUser)

router.post("/login", userController.loginUser)

// router.post("/books", bookController.createBook)

module.exports = router;