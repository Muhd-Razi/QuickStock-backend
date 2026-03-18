const  Products = require('../models/AddProductmodel');


exports.addProduct = async(req, res)=>{
    console.log('inside add produst')
    // res.json('Accepted request')
    console.log(req.file)

    const {nameproduct,price,unit,productDescription}=req.body
    const wholsaleMail = req.payload
    // const uploadImage = req.file.filename

    if (!req.file) {
  return res.status(400).json({ message: "Image upload failed" })
}

const uploadImage = req.file.filename

    const id = req.id
    

    console.log(nameproduct,price,unit,productDescription,uploadImage,wholsaleMail)

    try {
        const existingProduct = await Products.findOne({nameproduct,wholsaleMail,wholsalerId:id})
        if(existingProduct){
        res.status(401).json({message:'Product Already Added '})

        }else{
            const newProducts = new Products({nameproduct,price,unit,productDescription,uploadImage,wholsaleMail, wholsalerId:id})
            await newProducts.save()
            res.status(201).json({message:'Product Added successfully',newProducts})
        }
    } catch (error) {
        res.status(500).json(error)
    }

}


   
exports.getProducts = async(req,res)=>{
    console.log('inside get products')
    const {id} =req.params
    console.log(id)
  
    
   const searchKey = req.query.search

    try {

          const query ={
            wholsalerId:id,
            nameproduct:{
                $regex:searchKey,
                $options: "i"
            }
        }
// {wholsalerId:id},{query}

    const existingProduct = await Products.find(query)
    console.log(existingProduct)
    res.status(200).json(existingProduct)
    
    } catch (error) {
        res.status(500).json("error"+error)
    }

  
}


exports.getUpdateProducts = async(req,res)=>{
    console.log('inside get Update Products ')

   
   const searchKey = req.query.search
    const wholsalerId = req.id


    try {

         const query ={
            wholsalerId,
            nameproduct:{
                $regex:searchKey,
                $options: "i"
            }
        }

        const existingProduct = await Products.find(query)
        if(!existingProduct){
            res.status(400).json('Products not found')
        }
        res.status(200).json(existingProduct)
    } catch (error) {
        res.status(500).json({message:'Error',error})
    }
}



exports.editProducts = async(req,res)=>{
    console.log('inside edit products')
    
    const {nameproduct,price,unit,uploadImage}=req.body
    const wholsalerId = req.id
        const {id}=req.params

//     if (!req.file) {
//   return res.status(400).json({ message: "Image upload failed" })
// }
    const updateImage = req.file?req.file.filename:uploadImage
     

    try {
        // const updateProduct = await Products.findOneAndUpdate({wholsalerId},{nameproduct,price,unit,uploadImage:updateImage},{id} , {new:true})

          const updateProduct = await Products.findOneAndUpdate(
            { _id:id , wholsalerId },
            { nameproduct,price,unit,uploadImage:updateImage },
            { new:true }
        )

        await updateProduct.save()


          if(!updateProduct){
            return res.status(404).json({message:"Product not found"})
        }

        res.status(200).json({message:'Product updated',updateProduct})
        
    } catch (error) {
        res.status(500).json({message:'error'+error})
    }
}




