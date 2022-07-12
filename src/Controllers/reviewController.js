const mongoose  = require("mongoose");
const bookModel = require("../Models/bookModel.js")
const userModel = require("../Models/userModel.js")
const validator = require("../validator/validator.js")
const moment = require('moment')
const reviewModel = require("../Models/reviewModel.js")

let validateRating = (rating) => {
    const rate = /^\s*(?=[1-5])*[\w\.\s]{1}\s*$/
    return rate.test(rating)
}

let reviewedByValidator = function (reviewedBy) {
        let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
        return regx.test(reviewedBy);
    }

let validateReview = (review) => {
    const rev = /^\s*(?=[A-Z0-9])*[\w\.\s]{1,1000}\s*$/
    return rev.test(review)
}


const createReview = async function (req, res) {
   try {
      const content = req.body;
      if (Object.keys(content).length === 0) {
         // console.log(err.message)
         return res.status(400).send({ status: false, msg: "no content in the document" });
      }
      const bookId= req.params.bookId
      // const bodyBook= req.body.bookId
      if (!mongoose.Types.ObjectId.isValid(bookId)) { return res.status(400).send({ status: false, msg: "enter a valid id" }) }
      // if (!mongoose.Types.ObjectId.isValid(bodyBook)) { return res.status(400).send({ status: false, msg: "enter a valid id" }) }

      const book = await bookModel.findById(bookId);  
      if(!book || book.isDeleted === true){return res.status(404).send({status:false, msg: "no such book exists"})};

      // if(bookId !== bodyBook){
      //   return res.status(400).send({ status: false, msg: "bookId should be the same" })
      // }else{
     let rBy= req.body.reviewedBy;
     let rAt= req.body.reviewedAt;
     let rat= req.body.rating;
     let rev= req.body.review
         let v= {bookId: req.params.bookId ,reviewedBy: rBy,reviewedAt: rAt, rating: rat,review: rev}
        const savedData = await reviewModel.create(v);
        await bookModel.findByIdAndUpdate({ _id: bookId }, { reviews: book.reviews + 1 })
        res.status(201).send({ status: true, data: savedData })
      
   } catch (error) {
      console.log(error)
      return res.status(500).send({ status: false, errorName: error.name, msg: error.message });
   }
}



    const updateReview = async function (req, res){
    try{

        let reviewID = req.params.reviewId
        
        let bookId = req.params.bookId
        
        let data = req.body

        let{ reviewedBy, rating, review} = data

        const book = await bookModel.findOne({_id: bookId});
        if (!book || book.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such book exists" }) };

        // if(book.length != 24){return res.status(400).semd({status: false, msg: "enter valid bookId"})} 

        const Review = await reviewModel.findById(reviewID);
        if (!Review || book.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such review exists" }) };

        if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: "cannot update empty body" }) };
        
        if (!reviewedByValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter reviewedBy correctly" }) }

        if (!validateRating(rating)) { return res.status(400).send({ status: false, message: "please enter rating correctly" }) }

        if(!validateReview(review)){ return res.status(400).send({ status: false, message: "please enter review correctly" }) }

        if (data.reviewedBy){
            data.reviewedBy = data.reviewedBy;}
        
        if (data.rating){
            data.rating = data.rating;}
        
        if (data.review) {
        data.review = data.review
            }
         
        let findBooks = await bookModel.findOne({ _id: bookId, isDeleted: false }, { deletedAt: 0, __v: 0 });
        
        let updateReviewCount= await reviewModel.count({bookId: bookId, isDeleted:false})    

        const ReviewBookCheck = await reviewModel.findOne({ _id: reviewID, bookId: bookId, isDeleted: false })
 
        if (!ReviewBookCheck) { return res.status(404).send({ status: false, msg: "review not matching with the given book" }) }
        else
        {const combinedDetails = { _id: findBooks._id , title: findBooks.title , excerpt: findBooks.excerpt, userId: findBooks.userId, category: findBooks.category, subcategory: findBooks.subcategory, isDeleted: findBooks.isDeleted, reviews: updateReviewCount, releasedAt: findBooks.releasedAt, createdAt:findBooks.createdAt, updatedAt: findBooks.updatedAt , reviewsData: getReviews }
        
        return res.status(200).send({ status: true, message: "Books list", data: combinedDetails});}
        


    }catch(error){
        return res.status(500).send({status:false, error: error.name, msg:error.msg})
    }
}

const deleteReview = async function (req, res) {
   try {
       const reviewID = req.params.reviewId;
       const bookId= req.params.bookId
       const bookSearch = await bookModel.findById(bookId);
       if (!bookSearch || bookSearch.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such book exists" }) };//validation1
       const reviewSearch = await reviewModel.findById(reviewID);
        if (!reviewSearch || reviewSearch.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such review exists" }) }

       const ReviewBookCheck = await reviewModel.findOne({ _id: reviewID, bookId: bookId, isDeleted: false })

       const dateTime = new Date;

       if (!ReviewBookCheck) { return res.status(404).send({ status: false, msg: "review not matching with the given book" }) }
       else
       {
        await bookModel.findByIdAndUpdate({ _id: bookId }, { reviews: bookSearch.reviews - 1 });

        await reviewModel.findByIdAndUpdate(reviewID, { $set: { isDeleted: true, deleted: dateTime ,new: true }});
       return res.status(200).send({ status: true, msg: "book deleted successfully" });
        }
       

   } catch (error) {
       return res.status(500).send({ status: false, error: error.name, msg: error.message })
   } 
}
       
module.exports.createReview= createReview
module.exports.updateReview= updateReview
module.exports.deleteReview= deleteReview

        
