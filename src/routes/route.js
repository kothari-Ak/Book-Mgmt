const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController.js')
const Authentication = require("../middlewares/authentication.js")
const bookController = require('../Controllers/bookController.js')
const reviewController = require('../Controllers/reviewController.js')

router.post("/register", userController.createUser)

router.post("/login", userController.login)

router.post("/books", bookController.createBook)
router.get("/books", bookController.getBooks)

router.put("/books/:bookId", Authentication.checkLogin, Authentication.checkOwner, bookController.updateBook)

router.delete("/books/:bookId", bookController.deleteById)

router.post("/books/:bookId/review", reviewController.createReview)

module.exports = router;