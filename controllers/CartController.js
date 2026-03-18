const Cart = require('../models/Cartmodel')

exports.AddCartProducts = async(req,res)=>{
    console.log('inside cart add products')

    console.log(req.body)

    const userId = req.userId
    const {productId,wholsalerId} = req.body
    console.log("Cart created for:", userId)

    if(!userId) return res.status(400).json("UserId missing")
    if(!wholsalerId) return res.status(400).json("WholesalerId missing")
    if(!productId) return res.status(400).json("ProductId missing")

    try {
        let existingCart = await Cart.findOne({userId})
       

        if(!existingCart){

            existingCart = new Cart({
                userId,
                products: [{productId,wholsalerId,quantity:1}]
            })
        }else{
            
            const productIndex = existingCart.products.findIndex(item => item.productId.toString() === productId
)

            // if(productIndex > -1){
         
            //     existingCart.products[productIndex]
                 
            // }else{
                
            //     existingCart.products.push({productId,wholsalerId})
            // }

            if(productIndex > -1){
   return res.status(400).json({message:"Product already in cart"})
}else{
   existingCart.products.push({productId,wholsalerId,quantity:1})
}
        }

        await existingCart.save()
        res.status(200).json(existingCart)

    } catch (error) {
        res.status(500).json("Error: " + error)
    }
}




exports.GetCartProducts = async (req, res) => {

    const userId = req.userId

    try {

        let existingCart = await Cart.findOne({ userId })
            .populate("products.productId")
            .populate("products.wholsalerId")

        console.log("Cart Found:", existingCart)

     


        if (!existingCart) {
            return res.status(200).json({ products: [] })
        }

        res.status(200).json(existingCart)

    } catch (error) {
        res.status(500).json("Error " + error)
    }
}

exports.inCreaseQuantity = async(req,res)=>{
    console.log('inside increase Quantity ')
    const userId = req.userId
    console.log("userId",userId)

    const {productId,wholsalerId}=req.body
    console.log(req.body)


    try {

    const existingCart = await Cart.findOne({userId}) 
    .populate("products.productId")
     .populate("products.wholsalerId")


     if (!existingCart) {
         return res.status(404).json("Cart not found")
      }

    const index = existingCart.products.findIndex(item=> item.productId._id.toString() === productId )
    console.log("incoming:", productId)
    if(index >-1){
        existingCart.products[index].quantity+=1
        await existingCart.save()

    }
    res.status(200).json(existingCart)

   
        
    } catch (error) {
        res.status(500).json("error"+error)
    }

    
}

exports.decreaseQuantity = async(req,res)=>{
    console.log("inside decrase Quantity");

    const userId =req.userId
    const {productId}=req.body

    try {
        const existingCart = await Cart.findOne({userId})
        .populate("products.productId")
        .populate("products.wholsalerId")

        if(!existingCart){
             res.status(401).json("Cart not found")

       }
       const index = existingCart.products.findIndex(item=> item.productId._id.toString()===productId)

       if(index>-1){
        if(existingCart.products[index].quantity>1){
             existingCart.products[index].quantity-=1
        existingCart.save()
        }
       
       }

        res.status(200).json(existingCart)
    } catch (error) {
        console.log(error)
    }


}

exports.deleteCart = async(req,res)=>{
    console.log('inside delete cart')

    const userId=req.userId
    const {productId}=req.body

    try {
    const existingCart = await Cart.findOne({userId})

    if(!existingCart){
      return   res.status(400).json("cart not found")
    }

    const index = existingCart.products.findIndex((item)=> item.productId.toString()===productId)
    if(index === -1){
      return   res.status(400).json('product not found')
    }

    existingCart.products.splice(index,1)

    await existingCart.save()

    res.status(200).json({message:"deleted",existingCart})


    } catch (error) {
    res.status(500).json("Error"+error)
    }


}



// exports.GetCartProducts = async(req,res)=>{
//     console.log('inside get cart products')

//      const userId = req.userId 

//     try {

//      let existingCart = await Cart.findOne({userId})
//      console.log("UserId:", userId)
// console.log("Cart Found:", existingCart)

// console.log("UserId from token:", req.userId)
// console.log("Type:", typeof req.userId)


      
//         .populate("products.productId")
//         .populate("products.wholsalerId")

//          if (!existingCart) {
//             return res.status(200).json({ products: [] })
//         }

//     res.status(200).json(existingCart)


//     } catch (error) {
//         res.status(500).json("Error"+error)
//     }
   
// }