const express = require('express');
const router = express.Router();



const BookController = require("../src/Controllers/bookController")

router.post("/books", BookController.createBook)

module.exports = router;