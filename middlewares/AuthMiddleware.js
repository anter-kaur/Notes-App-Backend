import jwt from 'jsonwebtoken'

const AuthMiddleware=(req,res,next)=>{
    try{
    //     const token=req.headers["authorization"] || req.cookies.accessToken;
        
    // const decodedToken=jwt.verify(token,process.env.JWT_ACCESS_TOKEN)

    let token = null;

        // Check if the Authorization header exists and if it starts with "Bearer "
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Extract the token by removing the "Bearer " prefix
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.accessToken) {
            // If the Authorization header is not present, check for accessToken in cookies
            token = req.cookies.accessToken;
        }

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