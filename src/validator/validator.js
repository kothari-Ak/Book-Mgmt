let titleValidator = function (title) {
    let regex = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
    return regex.test(title);
}

let ISBNvalidate=function(ISBN){
let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
return ISBNRegex.test(ISBN)
}

module.exports.titleValidator=titleValidator

module.exports.ISBNvalidate=ISBNvalidate