const reviewModel = require("../Models/reviewModel")
const bookModel = require("../Models/bookModel")

let validateRating = (rating) => {
    var rate = /^[1-5]{1}$/;
    return rate.test(rating)}

let reviewedByValidator = function (reviewedBy) {
        let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
        return regx.test(reviewedBy);
    }

    const updateReview = async function (req, res){
    try{

        let reviewID = req.params.reviewId
        
        let bookID = req.params.bookId
        
        let data = req.body

        let{ reviewedBy, rating, review} = data

        if(!bookID && !reviewID){return res.status(400).send({status: false, msg: "bookID or reviewID missing in params"})}

        if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: "cannot update empty body" }) };

        const book = await bookModel.findById(bookID);
        if (!book || book.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such book exists" }) };

        const Review = await reviewModel.findById(reviewID);
        if (!Review || book.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such review exists" }) };
        
        if (!reviewedByValidator(reviewedBy)) { return res.status(400).send({ status: false, message: "please enter reviewedBy correctly" }) }

        if (!validateRating(rating)) { return res.status(400).send({ status: false, message: "please enter rating correctly" }) }

        if (data.reviewedBy){
            data.reviewedBy = data.reviewedBy;
        }
        
        if (data.rating) {
        
            data.rating = data.rating;
        }
        
        if (data.review) {
        data.review = data.review
            }
            
        const update = await reviewModel.findByIdAndUpdate(reviewID, { $set: { ...data } }, { new: true });
        return res.status(200).send({ status: true, reviewData: update });

        


    }catch(error){
        return res.status(500).send({status:false, error: error.name, msg:error.msg})
    }
}

module.exports.updateReview = updateReview


        // // if (reviewData.length > 0){
        // //     bookData.reviewData = reviewData
        // // }
        // res.status(200).send({status:true, data: reviewData})

        // let bookData = {
        //     _id: 1,
        //     title: 1,
        //     excerpt: 1,
        //     userId: 1,
        //     category: 1,
        //     subcategory: 1,
        //     releasedAt: 1,
        //     reviews: 1,
        // };
        

        // let reviewData = await reviewModel.findByIdAndUpdate({bookId: bookID._id, isDeleted: false, reviewId: reviewID._id})
