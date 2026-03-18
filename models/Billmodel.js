const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  wholsalerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wholsalers",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },

      name:{
        type:String,
        required:true
      },
      price:{
        type:Number,
        required:true
      },

      quantity:{
        type:Number,
        required:true
      },

      amount:{
        type:Number,
        required:true
      }


    },
  ],

  grandTotal:{
    type:Number,
     required:true
  },
  

  customer:{
  shop:{
    type:String,
    required:true
  },
  place:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  }
},

 status:{
        type:String,
        default:'pending'
    },
     bought:{
        type:String,
        default:""
    }

  
},

{timestamps: true}

);

module.exports = mongoose.model("Bills", BillSchema);
