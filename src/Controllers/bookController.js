const BookModel = require("../Models/bookModel")
const UserModel = require("../Models/userModel")
const mongoose = require("mongoose")
const validator= require("../validator/validator")



// ========================[CreateBlog]==================================
// const isValid = function (value) {
//     // if( typeof value === 'undefined' || value === null ) {
//     //   // console.log("1")
//     //     return false
//     // }
//     if( typeof value == 'string' && value.trim().length == 0 ) {
//     //   console.log("2")
//         return false
//     }
//     if ( typeof value == 'string' && value.length !== value.trim().length ) {
//       // console.log("4")
//         return false
//     }
//     if ( typeof value == 'number' ) {
//       // console.log("5")
//         return false
//     }
//     return true
//   }

// const isValid = function (value) {
//     if (typeof value === "undefined" || value === null) return false;
//     if (typeof value === "string" && value.trim().length === 0) return false;
    
//     return true}
  


module.exports.createBook = async function (req, res) {
    try {
        let data = req.body
        
        const { title, excerpt, userId,ISBN, category,subcategory, releasedAt } = data;
        // let inValid = ' '
        // if ( !validator.titleValidator ( title ) ) inValid = inValid + "title "
        // if ( !validator.titleValidator ( excerpt ) ) inValid = inValid + "excerpt "
        // if ( !isValid ( userId ) ) inValid = inValid + "userId "
        // if ( !validator.ISBNvalidate( ISBN ) ) inValid = inValid + "ISBN "
        // if ( !isValid ( category ) ) inValid = inValid + "category "
        // if ( !isValid ( subcategory ) ) inValid = inValid + "subcategory "
        //  if ( !isValid ( releasedAt  ) ) inValid = inValid + "releasedAt  "
        // // if ( !isValid ( reviews ) ) inValid = inValid + "reviews "
        // if ( !isValid(title) || !isValid(excerpt) ||!isValid(userId) || !isValid(ISBN) || !isValid(category) || !isValid(subcategory)|| !isValid(releasedAt)){
        //     return res.status(400).send({ status: false, msg: `Enter valid details in following field(s): ${inValid}` })
        // }

        

//         const printDate = function (){
//             const today = new Date();
        
//         const date = ("Today's Date" +'-'+today.getDate());
//           const month= ('Month'+'-'+ (today.getMonth()+1));
//           const year= ('Year'+'-'+ (today.getFullYear()));

// console.log(year+month+date)
        
        
//         }
        
//        const printMonth = function(){
//             const today =  new Date();
        
//             const date = ('Month'+'-'+ (today.getMonth()+1));
//             console.log(date)
//         }
   
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body should not be Empty.. " })
        }

        if (!title|| title.trim() == "")
        return res.status(400).send({ Status: false, message: "Please provide title ⚠️⚠️" })
    else
        data.title = data.title.trim()

        if (title) {
            let checkTitle = await BookModel.findOne({ title: title })

            if (checkTitle) {
                return res.status(400).send({ Status: false, message: "Please provide another title, this title has been used ⚠️⚠️" })
            }
        }
        

        if (!excerpt|| excerpt.trim() == "")
        return res.status(400).send({ Status: false, message: "Please provide excerpt ⚠️⚠️" })
    else
        data.excerpt = data.excerpt.trim()

        if (excerpt) {
            let checkExcerpt = await BookModel.findOne({ excerpt: excerpt })

            if (checkExcerpt) {
                return res.status(400).send({ Status: false, message: "Please provide another excerpt, this excerpt has been used ⚠️⚠️" })
            }
        }

        if (!userId|| userId.trim() == "")
        return res.status(400).send({ Status: false, message: "Please provide userId ⚠️⚠️" })
    else
        data.userId = data.userId.trim()
       
        let UserId = data.userId
        let FindId = await UserModel.findById(UserId)
        if (!FindId) return res.status(400).send({ status: false, msg: 'UserId does not exist' })

        if(!FindId.length==24)
        return res.status(400).send({ status: false, msg: 'UserId is not valid' })
        
        if (!ISBN|| ISBN.trim() == "")
        return res.status(400).send({ Status: false, message: "Please provide ISBN ⚠️⚠️" })
    else
        data.ISBN = data.ISBN.trim()

    if (ISBN) {
            let checkISBN = await BookModel.findOne({ ISBN: ISBN })

            if (checkISBN) {
                return res.status(400).send({ Status: false, message: "Please provide another ISBN, this ISBN has been used ⚠️⚠️" })
            }
        }
    

        if (!category|| category.trim() == "")
        return res.status(400).send({ Status: false, message: "Please provide category ⚠️⚠️" })
    else
        data.category = data.category.trim()  
        
        
        if (!subcategory|| subcategory.trim() == "")
        return res.status(400).send({ Status: false, message: "Please provide subcategory ⚠️⚠️" })
    else
        data.subcategory = data.subcategory.trim()
      
         
        // const date=new Date;
        // const dateTime=  date.toLocaleString()

     let bookCreated = await BookModel.create(data)
        res.status(201).send({ status: true, data: bookCreated})
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}