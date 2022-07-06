let titleValidator = function (title) {
    let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
    return regx.test(title);
}

let ISBN = function (ISBN) {
    var re = /^[0-9]{10}$/ ;

    return re.test(ISBN);
}

module.exports.titleValidator=titleValidator