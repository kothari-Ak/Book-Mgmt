// const isValidNumber = function (value) {
// //     const regEx = /^\s*(0-9){4}\-(0-9){2}\-(0-9){2}\s*$/
// //     const result = regEx.test(value)
// //     return result
// //   }

  
// // const a= isValidNumber("2002-04-12")
// // console.log(a)


// //var a
// //forin , foreach, forloop

// {
//    var a=2 
//     //console.log(a)
//     {
//         console.log(a)
//     }
// }


// console.log(a)




















// const updateBooks = async function (req, res) {
//     try {
//       let bookId = req.params.bookId;
//       let data = req.body
  
//       // if(!bookId)
//        (Object.keys(data).length == 0)
//         return res.status(400).send({
//           status: false,
//           msg: "Body is required",
//         });
  
//       let bookData = await bookModel.findOne({
//         _id: bookId,
//         isDeleted: false,
//       });
  
//       if (!bookData)
//         return res.status(404).send({
//           status: false,
//           msg: "boook-Id not found",
//         });
  
//       if (data.title) bookData.title = data.title;
//       if (data.excerpt) bookData.excerpt = data.excerpt;
//       if (data.ISBN) bookData.ISBN = data.ISBN;
  
//       const y = req.body["release date"]
//       if (y) {
//           if (!moment(data["release date"], "YYYY-MM-DD", true).isValid())
//       return res.status(400).send({status: false, msg: "Enter a valid date with the format (YYYY-MM-DD).",
//       })
//       await bookModel.findByIdAndUpdate(bookId, { $set: { releasedAt: y } }, { new: true });
//       }
      
//       await book.save();
  
//       res.status(200).send({ status: true, data: bookData });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send({ status: false, msg: error.message });
//     }
//   };
  
//   module.exports.updateBooks = updateBooks;

// expired rtoken?
// in get books
// review data 
// isdeleted: true error check
// book id doesn't exist if param id don't match
// post review
//valid messages in every key, status shoudl be 400
//put review
//invalid bookid and review id conditon
//delete review same issuse