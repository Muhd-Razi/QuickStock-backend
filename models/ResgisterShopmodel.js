const mongoose = require('mongoose');

const ShopRegisterSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    nameofshop:{
        type:String,
        required:true

    },
    place:{
        type:String,
        required:true
    },
    shoptype:{
        type:String,
        required:true
    },
    shopImage:{
        type:String,
        required:true 
    },
    role:{
        type:String,
        required:true,
        default:'wholsaleUser'
    }
    
},{timestamps: true})

module.exports = mongoose.model('wholsalers', ShopRegisterSchema)