const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController')
const Authentication = require("../middlewares/authentication")
const bookController = require('../Controllers/bookController')

router.post("/register", userController.createUser)

router.post("/login", userController.loginUser)

router.post("/books",Authentication.Authentication,  bookController.createBook)
router.get("/books", bookController.getBooks)

router.put("/books/:bookId", bookController.updateBook)

router.delete("/books/:bookId", bookController.deleteById)

module.exports = router;