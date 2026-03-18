const jwt = require('jsonwebtoken')

const wholsalejwtMiddleware = (req,res,next)=>{
    console.log('inside wholsalejwtMiddleware')
    

    const token = req.headers.authorization.slice(7)
    console.log(token)


    try {
    const jwtWholsaleVerification = jwt.verify(token, process.env.jwtKey)
    console.log(jwtWholsaleVerification)
    req.payload = jwtWholsaleVerification.wholsaleMail
    req.id=jwtWholsaleVerification.id
    


    next()
   
   
    } catch (error) {
        res.status(401).json({message:'wholsale Authentication error',error})
    }
    
    
}

module.exports = wholsalejwtMiddleware