const moment = require('moment')


const isValid = function (value){
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true
  }

const isValidUrl = function (value) {
  const regEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  const result = regEx.test(value)
  return result
}

const isValidCharacterLimit2to8 = function (value) {
  const regEx = /^\s*([a-zA-Z]){2,8}\s*$/
  const result = regEx.test(value)
  return result
}

const isValidCharacterLimit2to100 = function (value) {
  const regEx = /^\s*([a-zA-Z\s\,\.]){2,100}\s*$/
  const result = regEx.test(value)
  return result
}

const isValidNumber = function (value) {
  const regEx = /^\s*\91([0-9]){10}\s*$/
  const result = regEx.test(value)
  return result
}

const isValidEmail = (value) => {
  if (typeof value === "undefined" || value === null) return false
  const regEx = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
  const result = regEx.test(value)
  return result
}

function isArrString(x) {
  if (!x) { return false };
  if (!Array.isArray(x)) { return false };
  if (x.length === 0) { return false };
  for (let i = 0; i < x.length; i++) {
    if (typeof x[i] !== "string") { return false };
    if (x[i].trim().length !== x[i].length) { return false };
  }
  return true;
}

let Valid = function (name) {
  let regex = /^[.a-zA-Z\s,-]+$/
  return regex.test(name)
}

let isTitle = function isTitle(x) {
  const regEx = /^\s*(?=[A-Z])*[\w\.\s]{2,64}\s*$/   //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
  const result = regEx.test(x)
  return result;
}


let ISBNvalidate = function (ISBN) {
  let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
  return ISBNRegex.test(ISBN)
}

let validateRating = (rating) => {
  var rate = /^(?=.*?[0-5])$/
  return rate.test(rating)}

  function isBody(x){
    if(!x){return false}
    if(x.trim().length === 0 || x.trim().length <2){return false}
    const regEx = /^\s*[0-9!@#$%^&*\.\-\_\s]{1,}\s*$/
    if(regEx.test(x)){return false};
    return true;}

    function isName(x){
      const regEx = /^\s*(?=[A-Z])*[\w\.\s]{2,64}\s*$/   //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
      const result = regEx.test(x)
      return result;
  }
  

module.exports.isValid = isValid
module.exports.isValidUrl = isValidUrl
module.exports.isValidCharacterLimit2to8 = isValidCharacterLimit2to8
module.exports.isValidCharacterLimit2to100 = isValidCharacterLimit2to100
module.exports.isValidNumber = isValidNumber
module.exports.isValidEmail = isValidEmail
module.exports.isArrString = isArrString
module.exports.Valid = Valid
module.exports.isTitle = isTitle
module.exports.ISBNvalidate = ISBNvalidate
module.exports.validateRating= validateRating


const validateToUpdate = async function (req, res, next) {
  try {
      const data = req.body;
      if(Object.keys(data).length === 0){return res.status(400).send({status:false, error : "can't update blog without any key-values"})}

      if(data.title){
          if (!isName(data.title)) { return res.status(400).send({ status: false, message: "title is can be alphnumeric with atleast 1st letter as uppercase, special chraracters not allowed except dot(.)" }) };
          data.title = data.title.trim();   //updating trimmed value of title in request body
      }
      
      if(data.title){
        if (!isValid(data.title)) { return res.status(400).send({ status: false, message: "title cannot be empty." }) };
        data.title = data.title.trim();   //updating trimmed value of title in request body
    }
     
    if(data.excerpt){
          if (!isBody(data.body)) { return res.status(400).send({ status: false, msg: "body must contains alphabets" }) };
      }
      if(data.ISBN){
          if (!ISBNvalidate(data.ISBN)) { return res.status(400).send({ status: false, msg: "please provide a valid ISBN number." }) };  //also validates for undefined and null cases
      }
      next();
  } catch (error) {
      console.log(error)
     return res.status(500).send({ status: false, error: error.name, msg: error.message })
  }
}

module.exports.validateToUpdate=validateToUpdate
