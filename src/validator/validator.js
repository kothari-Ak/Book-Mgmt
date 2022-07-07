
const isValid = function (value) {
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

  function isArrString(x){
    if(!x){return false};   
    if(!Array.isArray(x)){return false};
    if(x.length === 0){return false};
    for(let i=0; i<x.length; i++){
        if(typeof x[i] !== "string"){return false};
        if(x[i].trim().length !== x[i].length){return false};
    }
    return true;
  }

  let Valid = function (name) {
    let regex = /^[.a-zA-Z\s,-]+$/
    return regex.test(name)
  }

  function isTitle(x){
    const regEx = /^\s*(?=[A-Z])*[\w\.\s]{2,64}\s*$/   //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
    const result = regEx.test(x)
    return result;
}


let ISBNvalidate=function(ISBN){
let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
return ISBNRegex.test(ISBN)
}

  module.exports.isValid = isValid
  module.exports.isValidUrl = isValidUrl
  module.exports.isValidCharacterLimit2to8 = isValidCharacterLimit2to8
  module.exports.isValidCharacterLimit2to100 = isValidCharacterLimit2to100
  module.exports.isValidNumber = isValidNumber
  module.exports.isValidEmail = isValidEmail
  module.exports.isArrString=isArrString
  module.exports.Valid=Valid
  module.exports.isTitle=isTitle
  module.exports.ISBNvalidate=ISBNvalidate
  

