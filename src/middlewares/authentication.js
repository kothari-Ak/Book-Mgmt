let jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const bookModel = require("../Models/bookModel");
const reviewModel = require("../Models/reviewModel");

let Authentication = async function (req, res, next) {
  try {
    let key = req.headers["x-api-key"];
    if (!key) key = req.headers["X-Api-Key"];
    if (!key)
      return res.status(400).send({ msg: "x-api-key header is required" });

    // let isKeyTrue = jwt.verify(key, "bm-8");
    // if (!isKeyTrue) return res.status(400).send({ err: "invalid key" });

        jwt.verify(key, "bm-8",((error)=> {
          if(error){return res.status(401).send({status:false, msg:"invalid token recived for authentication"})};
          next();
       }))
  } catch (error) {
    return res.status(500).send({ err: error.message });
  } 
};

module.exports.Authentication = Authentication

let Authorization = async function (req, res, next) {
  try {
    let logedInUserKey = req.headers["x-api-key"] || req.headers["X-Api-Key"];

    let decodeToken = jwt.verify( 
      logedInUserKey,
      "bm-8"
    );
    logedinUserID = decodeToken.id;
 
    requestBookId = req.params.bookId.toString();
    if (requestBookId.length != 24)
      return res.status(400).send({ msg: "enter valid Userid" });

    findUserID = await userModel.findOne({ _id: requestUserId });
    if (!findUserID) return res.status(404).send({ err: "id not found " });

    let userID = findUserID.userId.toString();

    if (logedinUserID != userID)
      return res.status(403).send({ msg: "logedin user is not authorized " });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ err: error.message });
  }
};
module.exports.Authorization = Authorization;

let AuthorizationToQuary= async function (req, res, next) {
  try {
    let logedInUserKey = req.headers["x-api-key"] || req.headers["X-Api-Key"];

    let decodeToken = jwt.verify(
      logedInUserKey,
      "bm-8"
    );
    logedinUserID = decodeToken.id;
    
    requestUserId = req.body.userId //.toString();
    if(!requestUserId)requestUserId=req.query.userId //.toString();
    if(!requestUserId) return res.status(400).send({err:"please enter userID"}) //.toString();

    if(requestUserId.length != 24) return res.status(400).send({ msg: "enter valid userID" });

    UserID = await userModel.findOne({ _id: requestUserId });
    if (! UserID) return res.status(404).send({ err: "UserID not found " });

    let userID = UserID._id.toString();

    if (logedinUserID != userID)
      return res.status(403).send({ msg: "logedin user is not authorized To create book " });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ err: error.message });
  }
}; 

module.exports.AuthorizationToQuary=AuthorizationToQuary

// let jwt = require("jsonwebtoken");
// const userModel = require("../Models/userModel");
// const bookModel = require("../Models/bookModel");
// const reviewModel = require("../Models/reviewModel");
// const mongoose  = require("mongoose");


// //authentication
// const Authentication = function (req, res, next) {
//   try {
//       const token = req.headers["x-api-key"];    //how to auto insert separate secret key for each login?
//       if (!token) { return res.status(401).send({ status: false, error: "token not sent", msg: "token is mandatory" }) } //validation1
    

//   } catch (error) {
//       return res.status(500).send({ status: false, error: error.name, msg: error.message }) 
//   }
// }

// //authorisation
// const Authorisation = async function (req, res, next) {
//   try {
//       const token = req.headers["x-api-key"];
//       const bookFind = req.params.bookId;
//       // if (!blogId) { return res.status(200).send({ status: false, msg: "enter blog Id" }) }; //validation1
//       if (!mongoose.Types.ObjectId.isValid(bookFind)) { return res.status(400).send({ status: false, msg: "enter a valid id" }) } //validation1(also handles !Id)

//       const book = await bookModel.findById(bookFind);
//       if(!book){return res.status(404).send({status:false, error: "no resource found"})} //val2
//       const bookOwnerId = book.userId.toString();

//       const decode = jwt.verify(token, "bm-8");
//       const loggedInUser = decode.userId;

//       if (loggedInUser === bookOwnerId) {
//           next(); //u r authorized to make changes in this blog
//       } else {
//           return res.status(403).send({ status: false, msg: "you are not authorised to make changes in this blog" }) //validation3
//       }
//   } catch (error) {
//       console.log(error);
//       return res.status(500).send({ status: false, error: error.name, msg: error.message })
//   }
// }

// module.exports.Authentication = Authentication
// module.exports.Authorisation = Authorisation
