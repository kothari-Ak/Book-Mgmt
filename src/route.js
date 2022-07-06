

const BookController = require("../src/Controllers/bookController")

router.post("/books", BookController.createBook)