const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js')
const bookController = require('../Controllers/bookController.js')
const { Authentication, Authorization, AuthorizationToQuary} = require("../middlewares/authentication")

router.post("/register", userController.createUser)

router.post("/login", userController.loginUser)

router.post("/books", Authentication, AuthorizationToQuary, bookController.createBook)

router.get("/books", Authentication, bookController.getBooks)

router.get("/books", Authentication, bookController.getBooksDataById)

router.put("/books/:bookId", Authentication, Authorization, bookController.updateBook)

router.delete("/books/:bookId",  Authentication, Authorization, bookController.deleteById)

module.exports = router;