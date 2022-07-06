const BookModel = require("../Models/bookModel")
const UserModel = require("../Models/userModel")
// ========================[CreateBlog]==================================
const isValid = function (value) {
    // if( typeof value === 'undefined' || value === null ) {
    //   // console.log("1")
    //     return false
    // }
    if( typeof value == 'string' && value.trim().length == 0 ) {
    //   console.log("2")
        return false
    }
    if ( typeof value == 'string' && value.length !== value.trim().length ) {
      // console.log("4")
        return false
    }
    if ( typeof value == 'number' ) {
      // console.log("5")
        return false
    }
    return true
  }

const createBook = async function (req, res) {
    try {
        let data = req.body
        
        const { title, excerpt, userId,ISBN, category,subcategory, reviews  } = data;
        let inValid = ' '
        if ( !isValid ( title ) ) inValid = inValid + "title "
        if ( !isValid ( excerpt ) ) inValid = inValid + "excerpt "
        if ( !isValid ( userId ) ) inValid = inValid + "userId "
        if ( !isValid ( ISBN ) ) inValid = inValid + "ISBN "
        if ( !isValid ( category ) ) inValid = inValid + "category "
        if ( !isValid ( subcategory ) ) inValid = inValid + "subcategory "
        if ( !isValid ( reviews ) ) inValid = inValid + "reviews "
        if ( !isValid(title) || !isValid(excerpt) ||!isValid(userId) || !isValid(ISBN) || !isValid(category) || !isValid(subcategory) || !isValid(reviews) ) {
            return res.status(400).send({ status: false, msg: `Enter valid details in following field(s): ${inValid}` })
        }
   
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body should not be Empty.. " })
        }
        let UserId = data.userId
        let FindId = await UserModel.findById(UserId)
        if (!FindId) return res.status(400).send({ status: false, msg: 'UserId does not exist' })

        let bookCreated = await BookModel.create(data)
        res.status(201).send({ status: true, data: bookCreated })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}