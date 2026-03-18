const Wholsalers =  require('../models/ResgisterShopmodel');
const jwt = require('jsonwebtoken');

exports.wholsaleRegister = async(req,res)=>{
    console.log('inside wholsale register')
    

    const {email,password,nameofshop,place,shoptype}=req.body
    if (!req.file) {
  return res.status(400).json({ message: "Image upload failed" })
}
     const shopImage = req.file.filename
    // const shopImage = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

     

    console.log(email,password,nameofshop,place,shoptype,shopImage)


    try {
        const existingWholsaler = await Wholsalers.findOne({email}) 
    if(existingWholsaler){
        res.status(401).json({message:'wholsaler already logged'})
    }else{
        const newWholsaler = new Wholsalers({email,password,nameofshop,place,shoptype,shopImage})
        await newWholsaler.save()
        res.status(201).json({wholsaler:newWholsaler})
    }
    } catch (error) {
        res.status(500).json({message:'wholsale register error',error})
    }

    

}

exports.wholsaleLogin = async(req,res)=>{
    console.log('inside wholsale login')

    const {email,password}=req.body

    try {
        const existingWholsaler = await Wholsalers.findOne({email})
        console.log(existingWholsaler)
        if(existingWholsaler){
            if(existingWholsaler.password==password){
                const token = jwt.sign({wholsaleMail:existingWholsaler.email , wholsaler:existingWholsaler.role,id:existingWholsaler._id},process.env.jwtKey)
                res.status(200).json({message:'login successful', wholsaler:existingWholsaler,token})
            }else{
                res.status(401).json({message:'password incorrect'})
            }
        }else{
            res.status(401).json({message:'wholsaler not found whith this email'})
        }
    } catch (error) {
     res.status(500).json({message:"error in login user", err:error.message})

    }
}

exports.getShops=async(req,res)=>{
    console.log('inside get shops')
    

    try {
    const allShops = await Wholsalers.find().sort({_id:-1}).limit(4)
    res.status(200).json(allShops)
    } catch (error) {
        res.status(500).jso("Error"+error)
    }

 
}

exports.viewAllShops = async(req,res)=>{
    console.log(req.query)

    const searchKey = req.query.search
    
    console.log('inside view all shops')


    try {

        const query ={
            nameofshop:{
                $regex:searchKey,
                $options: "i"
            }
        }
    const viewAll = await Wholsalers.find(query)
    res.status(200).json(viewAll)
    } catch (error) {
        res.status(500).json("Error"+error)
    }
    
}

exports.getWholsalersAdmin = async(req,res)=>{
    console.log('inside getWholsalersAdmin')

    try {
     const existingWholsaler = await Wholsalers.find()
     res.status(200).json(existingWholsaler)
    } catch (error) {
        res.status(500).json({message:"Error",error})
    }

    
}


