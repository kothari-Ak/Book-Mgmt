let titleValidator = function (title) {
    let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
    return regx.test(title);
}

let ISBNvalidate=function(ISBN){
let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
return regx.test(ISBN)
}

module.exports.titleValidator=titleValidator

module.exports.ISBNvalidate=ISBNvalidate