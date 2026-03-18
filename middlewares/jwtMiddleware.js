const jwt = require('jsonwebtoken');
const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware')
    const token = req.headers.authorization.slice(7)
    console.log(token)

    try {
    const jwtverification = jwt.verify(token,process.env.jwtKey)
    console.log(jwtverification)
    req.userId = jwtverification.retailId   
    req.payload = jwtverification.userMail
 
   
   next()
    
    } catch (error) {
        res.status(401).json({message:'Authetication error',error})
    }

   
    
   
}

module.exports = jwtMiddleware