const mongoose = require('mongoose')

const CartShema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                 ref:"Products",
                required:true
            },
            wholsalerId:{
                type:mongoose.Schema.Types.ObjectId,
                 ref:"wholsalers",
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]


})


module.exports = mongoose.model('Cart',CartShema)