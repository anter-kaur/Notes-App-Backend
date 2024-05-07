import jwt from 'jsonwebtoken'

const AuthMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["authorization"] || req.cookies.accessToken;
        
    const decodedToken=jwt.verify(token,process.env.JWT_ACCESS_TOKEN)

    // if(!decodedToken){
    //     res.status(400).json({message:"Invalid Token"})
    // }
    req.user=decodedToken; 
    next();
}
catch(error){
    res.status(400).json({message:"Invalid Access"})
}
}

export default AuthMiddleware;