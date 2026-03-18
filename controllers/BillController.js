const proBills = require('../models/Billmodel')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const mongoose = require('mongoose')


exports.showBill = async(req,res)=>{
    console.log('inside show bill')

    const userId = req.userId
     
    const {wholsalerId,items,customer} =req.body
    
    console.log(req.body)



    try {


         if(!items || items.length===0){
     return res.status(400).json("No items")
   }

   const formatted = items.map(i=>({
     productId:i.productId,
     name:i.name,
     price:Number(i.price),
     quantity:Number(i.quantity),
      uploadImage: i.uploadImage,
     amount:Number(i.price) * Number(i.quantity)
   }))

   const grandTotal = formatted.reduce((s,i)=> s+i.amount,0)

   const bill = await proBills.create({
     userId,
     wholsalerId,
     items:formatted,
     grandTotal,
     customer,
   })

   console.log("Saving wholesalerId:", wholsalerId)

   res.status(201).json(bill)


        
    } catch (error) {
        res.status(500).json("Error"+error)
    }
  

    
}

exports.getBill = async(req,res)=>{
  console.log('inside get bill')
    console.log(req.query)

    


  // const {id}=req.params
  // console.log(id)

  const searchKey = req.query.search

  const wholsalerId = req.id


  try {
  // const existingBill = await proBills.find({wholsalerId:id}).sort({ createdAt: -1 });
 let filter = { wholsalerId}

    if (searchKey) {
  filter.$or = [
    { "customer.shop": { $regex: searchKey, $options: "i" } },
    { "customer.phone": { $regex: searchKey, $options: "i" } }
  ]
}
     console.log("final filter:", filter)

//   const query={
//   "customer.shop":{
//       $regex:searchKey,
//       $options:'i'
//     }
//   }
//   console.log("wholsalerId:", wholsalerId)
// console.log("query:", query)

   const existingBill = await proBills.find(filter).sort({ createdAt: -1 }).populate("userId")
 
   console.log("Logged wholesalerId:", req.id)
  

  res.status(200).json(existingBill)

  } catch (error) {
    res.status(500).json({message:"Error",error})
  }




}

exports.deleteBill = async(req,res)=>{
  console.log('inside delete Bill')
  const {id} = req.params
  console.log(req.params)

  try {
    const deleteItem = await proBills.findByIdAndDelete({_id:id})

      res.status(200).json({message:'Deleted',deleteItem})


  } catch (error) {
    res.status(500).json({message:"Error",error})
  }


}







exports.makePayment = async(req,res)=>{

 const {billId} = req.body
 
 const bill = await proBills.findById(billId)
 if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

 const session = await stripe.checkout.sessions.create({

  payment_method_types:["card"],

  line_items: bill.items.map(item=>({
   price_data:{
    currency:"inr",
    product_data:{
     name:item.name
    },
    unit_amount:item.price * 100
   },
   quantity:item.quantity
  })),

  mode:"payment",

  success_url:`${process.env.CLIENT_URL}`,

  cancel_url:`${process.env.CLIENT_ERROR}/payment-cancel`

 })


 res.json({url:session.url})

}



