const mongoose = require("mongoose");
const bookModel = require("../Models/bookModel")
const userModel = require("../Models/userModel")

const validator = require("../validator/validator.js")
const moment = require('moment')



const createBook = async function (req, res) {
    try {
        let data = req.body
        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body should not be Empty.. " })
        }

        if (!title || title.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide title ⚠️⚠️" })
        else
            data.title = data.title.trim()

        if (!validator.isTitle(title)) {
            return res.status(400).send({ Status: false, message: "Please enter valid title ⚠️⚠️" })
        }

        if (title) {
            let checkTitle = await bookModel.findOne({ title: title })

            if (checkTitle) {
                return res.status(400).send({ Status: false, message: "Please provide another title, this title has been used ⚠️⚠️" })
            }
        }


        if (!excerpt || excerpt.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide excerpt ⚠️⚠️" })
        else
            data.excerpt = data.excerpt.trim()

        if (!validator.isValid(excerpt)) {
            return res.status(400).send({ Status: false, message: "Please enter valid excerpt ⚠️⚠️" })
        }

        if (excerpt) {
            let checkExcerpt = await bookModel.findOne({ excerpt: excerpt })

            if (checkExcerpt) {
                return res.status(400).send({ Status: false, message: "Please provide another excerpt, this excerpt has been used ⚠️⚠️" })
            }
        }

        if (!userId || userId.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide userId ⚠️⚠️" })
        else
            data.userId = data.userId.trim()

        let UserId = data.userId
        let FindId = await userModel.findById(UserId)
        if (!FindId) return res.status(400).send({ status: false, msg: 'UserId does not exist' })

        if (!FindId.length == 24)
            return res.status(400).send({ status: false, msg: 'UserId is not valid' })

        if (!ISBN || ISBN.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide ISBN ⚠️⚠️" })
        else
            data.ISBN = data.ISBN.trim()

        if (!validator.ISBNvalidate(ISBN)) {
            return res.status(400).send({ Status: false, message: "Please enter valid ISBN ⚠️⚠️" })
        }

        if (ISBN) {
            let checkISBN = await bookModel.findOne({ ISBN: ISBN })

            if (checkISBN) {
                return res.status(400).send({ Status: false, message: "Please provide another ISBN, this ISBN has been used ⚠️⚠️" })
            }
        }


        if (!category || category.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide category ⚠️⚠️" })
        else
            data.category = data.category.trim()

        if (!validator.Valid(category)) {
            return res.status(400).send({ Status: false, message: "Please enter valid category ⚠️⚠️" })
        }


        if (!subcategory || subcategory.length == 0)
            return res.status(400).send({ Status: false, message: "Please provide subcategory ⚠️⚠️" })
        else
            data.subcategory = data.subcategory

        if (!validator.Valid(subcategory)) {
            return res.status(400).send({ Status: false, message: "Please enter valid subcategory ⚠️⚠️" })
        }



        if (!releasedAt || releasedAt.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide releasedDate ⚠️⚠️" })
        else
            data.releasedAt = data.releasedAt.trim()

        if (!moment(releasedAt, "YYYY-MM-DD", true).isValid())
            return res.status(400).send({
                status: false,
                msg: "Enter a valid date with the format (YYYY-MMMM-DD).",
            })

        let bookCreated = await bookModel.create(data)
        res.status(201).send({ status: true, data: bookCreated })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const updateBook = async function (req, res) {
    try {
        const Id = req.params.bookId;
        let data = req.body;
        if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: "cannot update empty body" }) };   //validation1

        const book = await bookModel.findById(Id);
        if (!book || book.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such book exists" }) };//validation1

        if (data.title) {
            if (!validator.isTitle(data.title)) {
                return res.status(400).send({ Status: false, message: "Please enter valid title ⚠️⚠️" })
            }
            let checkTitle = await bookModel.findOne({ title: data.title })
            if (checkTitle) {
                return res.status(400).send({ Status: false, message: "Please provide another title, this title has been used ⚠️⚠️" })
            }
            data.title = data.title;
        }


        if (data.excerpt) {
            if (!validator.isValid(data.excerpt)) {
                return res.status(400).send({ Status: false, message: "Please enter valid excerpt ⚠️⚠️" })
            }
            let checkExcerpt = await bookModel.findOne({ title: data.excerpt })
            if (checkExcerpt) {
                return res.status(400).send({ Status: false, message: "Please provide another title, this excerpt has been used ⚠️⚠️" })
            }
            data.excerpt = data.excerpt;
        }


        if (data.ISBN) {

            if (!validator.ISBNvalidate(data.ISBN)) {
                return res.status(400).send({ Status: false, message: "Please enter valid ISBN ⚠️⚠️" })
            }
            let checkISBN = await bookModel.findOne({ title: data.ISBN })
            if (checkISBN) {
                return res.status(400).send({ Status: false, message: "Please provide another title, this title has been used ⚠️⚠️" })
            }
            data.ISBN = data.ISBN

        }


        const y = req.body["release date"]
        if (y) {
            if (!moment(data["release date"], "YYYY-MM-DD", true).isValid())
        return res.status(400).send({status: false, msg: "Enter a valid date with the format (YYYY-MM-DD).",
        })
        await bookModel.findByIdAndUpdate(Id, { $set: { releasedAt: y } }, { new: true });
        }
        const updated = await bookModel.findByIdAndUpdate(Id, { $set: { ...data } }, { new: true });
        return res.status(200).send({ status: true, data: updated });


    } catch (err) {
        return res.status(500).send({ status: false, error: err.name, msg: err.message })
    }
}

const getBooks = async function (req, res) {
    try {
        let getQueryData = req.query;

        const { userId, category, subcategory } = getQueryData;

        if (Object.keys(getQueryData).length > 0) {
            if (!userId && !category && !subcategory) {
                return res.status(400).send({
                    status: false,
                    message: "Please enter value like  'userId','category','subcategory'",
                });
            }
        }

        //value which will show in response
        let valueToShow = {
            _id: 1,
            title: 1,
            excerpt: 1,
            userId: 1,
            category: 1,
            subcategory: 1,
            releasedAt: 1,
            reviews: 1,
        };

        const findBooks = await bookModel
            .find({ $and: [getQueryData, { isDeleted: false }] })
            .select(valueToShow)
            .sort({ title: 1 });

        if (findBooks.length == 0) {
            return res.status(404).send({ status: false, message: "No Book found" });
        }

        return res
            .status(200)
            .send({ status: true, message: "success", data: findBooks });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

//getBooksDataById
//getBooksDataById-path param
//validation for ObjectId
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}


const getBooksDataById = async function (req, res) {
    try {
        let getbookId = req.params.bookId;

        if (!isValidObjectId(getbookId)) {
            return res.status(400).send({ status: false, message: "BookId is in invalid format." })
        }
        //try to find book from that id
        let findBooks = await bookModel.findOne({ _id: getbookId, isDeleted: false }, { deletedAt: 0, __v: 0 });

        //if doc not found
        if (!findBooks) {
            return res.status(404).send({ status: false, message: "Book not found" });
        }
        return res.status(200).send({ status: true, message: "success", data: findBooks });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}






module.exports.createBook = createBook
module.exports.updateBook = updateBook
module.exports.deleteById = deleteById
module.exports.getBooks = getBooks
module.exports.getBooksDataById = getBooksDataById