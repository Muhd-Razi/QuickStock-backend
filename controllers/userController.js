const Users = require('../models/usermodel');
const jwt = require('jsonwebtoken') 
exports. registerUser= async(req,res)=>{
    console.log('inside rgister user')
    console.log(req.body)
    const { username,email,password} = req.body

    try {
        const existingUser = await  Users.findOne({email})

    if(existingUser){
        res.status(401).json({message:'user already Logged'})
    }else{
        const newUser = new Users({username,email,password})
        await newUser.save()
        res.status(201).json(newUser)
        
    }
    } catch (error) {
        res.status(500).json({message:'error registering user', error:error.message})
    }
    
    
}

exports.loginUser = async(req,res)=>{
    console.log('inside login ')
    console.log(req.body);

    const {email,password}=req.body

    try {
        const existingUser = await Users.findOne({email})
        if(existingUser){
            if(existingUser.password==password){
            const token = jwt.sign({usermail:existingUser.email, role:existingUser.role,retailId:existingUser._id},process.env.jwtKey)
            console.log(token)

            res.status(201).json({message:"Login successful",user:existingUser,token})


            }else{
                res.status(401).json({message:"password incorrect"})
            }
        }else{
            res.status(401).json({messge:"user not found whith this email"})
        }
    } catch (error) {
        res.status(500).json({message:"error in login user", err:error.message})
    }
    

}

exports.googleAuth = async(req,res)=>{
    console.log('inside google login')
    const {email,password,username,profile}=req.body

    try {
        const existingUser = await Users.findOne({email})
        if(existingUser){

             if (!existingUser.profile) {
        existingUser.profile = profile
        await existingUser.save()
    }

            const token = jwt.sign({userMail:existingUser.email, role:existingUser.role,retailId:existingUser._id},process.env.jwtKey)
            console.log(token)
            res.status(201).json({message:'login successfull', user:existingUser,token})

        }else{
            const newUser = new Users({email,password,username,profile})
            await newUser.save()
             const token = jwt.sign({userMail:newUser.email, role:newUser.role},process.env.jwtKey)
            res.status(201).json({message:'login successfull',user:newUser,token})
        }
    } catch (error) {
        res.status(500).json({message:'Error in Login ' ,error:error.message})
    }

}


exports.getUsersAdmin = async(req,res)=>{
    console.log('inside getUsersAdmin ')


    try {
    const existingUser = await  Users.find({'role':'retailUser'})
    res.status(200).json(existingUser)

    } catch (error) {
        res.status(500).json({message:'Error'+error})
    }
}


// exports.updateAdmin = async(req,res)=>{
//     console.log('inside update Admin')

//     const {username,password,uploadImg}=req.body
//     const email = req.payload
//     const role = req.role
//     const updateImage = req.file ? req.file.filename : uploadImg

//     try {
//         const existingUser = await Users.findOneAndUpdate({email},{username,password,uploadImg:updateImage,role})
//         console.log("EMAIL:", email);

//         res.status(200).json({message:"Admin updated",existingUser})
//     } catch (error) {
//         res.status(500).json({message:'Error'+error})
//     }

// }

exports.updateAdmin = async (req, res) => {

  const { username, password, uploadImg } = req.body
  const email  = req.payload
  const role = req.role
if (!req.file) {
  return res.status(400).json({ message: "Image upload failed" })
}
  const updateImage = req.file ? req.file.filename : uploadImg

  try {
console.log("TOKEN EMAIL :", email)

    const existingUser = await Users.findOneAndUpdate(
      {  email  },
      { username,email, password, uploadImg: updateImage, role },
      { new: true })
      console.log("FOUND USER :", existingUser)

    

    res.status(200).json({
      message: "Admin updated",
      existingUser
    })

  } catch (error) {
    res.status(500).json({ message: "Error " + error })
  }
}