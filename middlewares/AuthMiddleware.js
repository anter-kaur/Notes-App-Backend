import jwt from 'jsonwebtoken'

const AuthMiddleware=(req,res,next)=>{
    const token=req.cookies.accessToken;
    try{
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