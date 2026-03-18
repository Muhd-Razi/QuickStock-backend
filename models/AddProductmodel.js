const mongoose = require('mongoose');

 const productSchema = new mongoose.Schema({
    nameproduct:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    unit:{
        type:String,
        required:true
    },
    uploadImage:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    wholsaleMail:{
        type:String,
        required:true
    },
    wholsalerId:{
        type:String,
        required:true
    }
  

 })

 module.exports = mongoose.model('Products',productSchema);
