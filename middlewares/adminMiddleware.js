const jwt = require('jsonwebtoken')

const AdminjwtMidleware = async(req,res,next)=>{
    console.log('inside admin jwt middleware')
     const token = req.headers.authorization.slice(7)
    
    console.log(token);
    // verify token
    try {
    const jwtVerification =jwt.verify(token,process.env.jwtKey)
    console.log(jwtVerification);
    req.payload = jwtVerification.usermail
    req.role=jwtVerification.role
    if(jwtVerification.role=="retailAdmin"){
     next()

    }else{
        res.status(401).json("Unothorized User",error);
        
    }
    } catch (error) {
        res.status(401).json("Authentication Error",error)
    }
    


}

module.exports = AdminjwtMidleware