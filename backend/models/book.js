'use strict'
var mongoose = require(mongoose);
var Schema = mongoose.Schema;

var BookSchema = Schema({
    title:String,
    author:String,
    publisher:String,
    genre:String,
    subgenre:String,
    type:String, // type of article, book, magazine or video
    codNOrder:String, //code of the old system with format: genre-subgenre-numberOrder
    idOld: Number, // id of book in the old system (useful to update from last id)

    uploadDate:{type:Date,default:Date.now},
    active: Boolean //

});


module.exports= mongoose.model('Book',BookSchema);
