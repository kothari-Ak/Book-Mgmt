const mongoose  = require("mongoose");
const bookModel = require("../Models/bookModel.js")
const userModel = require("../Models/userModel.js")
const validator = require("../validator/validator.js")
const moment = require('moment')
const reviewModel = require("../Models/reviewModel.js")

const createReview = async function (req, res) {
   try {
      const content = req.body;
      if (Object.keys(content).length === 0) {
         // console.log(err.message)
         return res.status(400).send({ status: false, msg: "no content in the document" });
      }
      const bookId= req.params.bookId
      const bodyBook= req.body.bookId
      if (!mongoose.Types.ObjectId.isValid(bookId)) { return res.status(400).send({ status: false, msg: "enter a valid id" }) }
      if (!mongoose.Types.ObjectId.isValid(bodyBook)) { return res.status(400).send({ status: false, msg: "enter a valid id" }) }

      const book = await bookModel.findById(bookId);  
      if(!book || book.isDeleted === true){return res.status(404).send({status:false, msg: "no such book exists"})};

      if(bookId !== bodyBook){
        return res.status(400).send({ status: false, msg: "bookId should be the same" })
      }else{
        const savedData = await reviewModel.create(content);
        res.status(201).send({ status: true, data: savedData })
      }


      
   } catch (error) {
      console.log(error)
      return res.status(500).send({ status: false, errorName: error.name, msg: error.message });
   }
}


module.exports.createReview= createReview