const bookModel = require('../models/bookModel');

const updateBook = async function (req, res) {
    try {
        const Id = req.params.bookId;
        let data = req.body;
        if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: "cannot update empty body" }) };   //validation1

        const book = await bookModel.findById(Id);  
        if(!book || book.isDeleted === true){return res.status(404).send({status:false, msg: "no such book exists"})};//validation1

        if (data.title) {
            data.title = [...data.title];
        }
        if (data.excerpt) {
            data.excerpt = [...data.excerpt];
        }
        if (data.ISBN) {
            data.ISBN = [...data.ISBN]   
        }


        const updated = await bookModel.findByIdAndUpdate(Id, { $set: { ...data, "release date" : Date.now() } }, { new: true });
        return res.status(200).send({ status: true, data: updated });

    } catch (err) {
        return res.status(500).send({ status: false, error: err.name, msg: err.message })  
    }
}


const deleteById = async function(req,res){
    try {
        const id = req.params.bookId;
        const blog = await bookModel.findById(id);
        if(!book || book.isDeleted === true){return res.status(404).send({status:false, msg: "no such book exists"})};//validation1
        
        const d = new Date; const dateTime = d.toLocaleString();

        await bookModel.findByIdAndUpdate(id, {$set: {isDeleted: true, deletedAt: dateTime}});
        return res.status(200).send({status:true, msg: "book deleted successfully"});

    } catch (error) {
        return res.status(500).send({status:false, error: error.name, msg: error.message})
    }
}



module.exports.updateBook= updateBook
module.exports.deleteById= deleteById
// deletedAt: {type: Date}, 

//     isDeleted: {type:Boolean, default: false},

//     releasedAt: {type: Date, required: true}},
    