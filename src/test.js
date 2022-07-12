// // const isValidNumber = function (value) {
// // //     const regEx = /^\s*(0-9){4}\-(0-9){2}\-(0-9){2}\s*$/
// // //     const result = regEx.test(value)
// // //     return result
// // //   }

  
// // // const a= isValidNumber("2002-04-12")
// // // console.log(a)


// // //var a
// // //forin , foreach, forloop

// // {
// //    var a=2 
// //     //console.log(a)
// //     {
// //         console.log(a)
// //     }
// // }


// // console.log(a)




















// // const updateBooks = async function (req, res) {
// //     try {
// //       let bookId = req.params.bookId;
// //       let data = req.body
  
// //       // if(!bookId)
// //        (Object.keys(data).length == 0)
// //         return res.status(400).send({
// //           status: false,
// //           msg: "Body is required",
// //         });
  
// //       let bookData = await bookModel.findOne({
// //         _id: bookId,
// //         isDeleted: false,
// //       });
  
// //       if (!bookData)
// //         return res.status(404).send({
// //           status: false,
// //           msg: "boook-Id not found",
// //         });
  
// //       if (data.title) bookData.title = data.title;
// //       if (data.excerpt) bookData.excerpt = data.excerpt;
// //       if (data.ISBN) bookData.ISBN = data.ISBN;
  
// //       const y = req.body["release date"]
// //       if (y) {
// //           if (!moment(data["release date"], "YYYY-MM-DD", true).isValid())
// //       return res.status(400).send({status: false, msg: "Enter a valid date with the format (YYYY-MM-DD).",
// //       })
// //       await bookModel.findByIdAndUpdate(bookId, { $set: { releasedAt: y } }, { new: true });
// //       }
      
// //       await book.save();
  
// //       res.status(200).send({ status: true, data: bookData });
// //     } catch (error) {
// //       console.log(error.message);
// //       res.status(500).send({ status: false, msg: error.message });
// //     }
// //   };
  
// //   module.exports.updateBooks = updateBooks;

// // expired rtoken?
// // in get books
// // review data 
// // isdeleted: true error check
// // book id doesn't exist if param id don't match


// // post review
// //valid messages in every key, status shoudl be 400
// //put review
// //invalid bookid and review id conditon
// //delete review same issuse

// const getBooks = async function (req, res) {
//     try {
//       let getQueryData = req.query;
  
//       const { userId, category, subcategory } = getQueryData;
  
//       if (Object.keys(getQueryData).length > 0) {
//         if (!userId && !category && !subcategory) {
//           return res.status(400).send({
//             status: false,
//             message: "Please enter value like  'userId','category','subcategory'",
//           });
//         }
//       }
  
//       //value to show in response
//       let valueToShow = {
//         _id: 1,
//         title: 1,
//         excerpt: 1,
//         userId: 1,
//         category: 1,
//         subcategory: 1,
//         releasedAt: 1,
//         reviews: 1,
//       };
  
//       const findBooks = await bookModel
//         .find({ $and: [getQueryData, { isDeleted: false }] })
//         .select(valueToShow)
//         .sort({ title: 1 });
  
//       if (findBooks.length == 0) {
//         return res.status(404).send({ status: false, message: "No Book found" });
//       }
  
//       return res
//         .status(200)
//         .send({ status: true, message: "Book List", data: findBooks });
//     } catch (error) {
//       res.status(500).send({ status: false, message: error.message });
//     }
//   };

//   //getBooksDataById

//     //validation for ObjectId
    
//     const isValidObjectId = function (objectId) {
//         return mongoose.Types.ObjectId.isValid(objectId);
//           }

//     const getBooksDataById = async function (req, res) {
//      try {
//        let getbookId = req.params.bookId;
   
//        if (!isValidObjectId(getbookId)) {
//          return res.status(400).send({ status: false, message: "BookId is in invalid format." });
//        }
//        //try to find book from that id
//        let findBooks = await bookModel
//          .findOne({ _id: getbookId, isDeleted: false }, { deletedAt: 0, });
   
//        //if doc not found
//        if (!findBooks) {
//          return res.status(404).send({ status: false, message: "Book not found" });
//        }
   
//        //Data from reviewModel
//        let valueTohide = { isDeleted: 0, createdAt: 0, updatedAt: 0};
//        const findReviews = await reviewModel.find(
//          { bookId: getbookId, isDeleted: false },
//          valueTohide
//        );
   
//        findBooks.reviewsData = findReviews;
   
//        return res
//          .status(200)
//          .send({ status: true, message: "Book List", data: findBooks });
//      } catch (error) {
//        res.status(500).send({ status: false, message: error.message });
//      }
//    };