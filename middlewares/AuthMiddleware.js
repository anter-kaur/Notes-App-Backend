import jwt from 'jsonwebtoken'

const AuthMiddleware = (req, res, next) => {
    try {
            const token=req.headers["authorization"] ;
const splitToken = token.split(" ")[1]
        
        const decodedToken = jwt.verify(splitToken, process.env.JWT_ACCESS_TOKEN)

        req.user = decodedToken;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid Access" })
    }
}

export default AuthMiddleware;