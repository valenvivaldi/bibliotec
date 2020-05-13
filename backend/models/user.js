'use strict'
var mongoose = require(mongoose);
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username:String,
    password:String,
    dni:Number,

    readed:[{type:mongoose.Schema.Types.ObjectId,ref:'Book'}], //year of publication
    pendient:[{type:mongoose.Schema.Types.ObjectId,ref:'Book'}]
    

    
    active: Boolean //

});


module.exports= mongoose.model('User',UserSchema);
