let jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const bookModel = require("../Models/bookModel");
const reviewModel = require("../Models/reviewModel");
const mongoose  = require("mongoose");


//authentication
const checkLogin = function (req, res, next) {
  try {
      const token = req.headers["x-api-key"];    //how to auto insert separate secret key for each login?
      if (!token) { return res.status(401).send({ status: false, error: "token not sent", msg: "token is mandatory" }) } //validation1
    
      jwt.verify(token, "topScerect",((error)=> {
          if(error){return res.status(401).send({status:false, msg:"invalid token recived for authentication"})};
          next();
       }));
  } catch (error) {
      return res.status(500).send({ status: false, error: error.name, msg: error.message }) 
  }
}

//authorisation
const checkOwner = async function (req, res, next) {
  try {
      const token = req.headers["x-api-key"];
      const bookFind = req.params.bookId;
      // if (!blogId) { return res.status(200).send({ status: false, msg: "enter blog Id" }) }; //validation1
      if (!mongoose.Types.ObjectId.isValid(bookFind)) { return res.status(400).send({ status: false, msg: "enter a valid id" }) } //validation1(also handles !Id)

      const book = await bookModel.findById(bookFind);
      if(!book){return res.status(404).send({status:false, error: "no resource found"})} //val2
      const bookOwnerId = book.userId.toString();

      const decode = jwt.verify(token, "topScerect");
      const loggedInUser = decode.userId;

      if (loggedInUser === bookOwnerId) {
          next(); //u r authorized to make changes in this blog
      } else {
          return res.status(403).send({ status: false, msg: "you are not authorised to make changes in this blog" }) //validation3
      }
  } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, error: error.name, msg: error.message })
  }
}

module.exports.checkLogin = checkLogin
module.exports.checkOwner= checkOwner

