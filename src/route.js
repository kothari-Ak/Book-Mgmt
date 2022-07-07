const express = require('express');
const router = express.Router();
const userController = require('../src/Controllers/userController.js')
const bookController = require('../src/Controllers/bookController.js')

router.post("/register", userController.createUser)

router.post("/login", userController.loginUser)

router.put("/books/:bookId", bookController.updateBook)

router.delete("/books/:bookId", bookController.deleteById)
router.post("/books", bookController.createBook)

module.exports = router;