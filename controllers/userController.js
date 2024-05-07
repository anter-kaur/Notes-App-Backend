import User from '../models/userModel.js'



export const register=async (req,res)=>{
    const {email,password,username,phone}=req.body;

    if(!email || !password || !username || !phone){
        return res.status(400).json({message:"Enter all fields"})
    }
    
    const userexist=await User.findOne({email});
    if(userexist){
        return res.status(400).json({message:"Email already registered"})
    }
    const phoneexist=await User.findOne({phone})
    if(phoneexist){
        return res.status(400).json({message:"Phone no. is already registered"})
    }

    const user=User.create({
    username,
    email,
    password,
    phone
    })

    // const finduser=await User.findOne({email});

    // if(!finduser){
    //     return res.status(400).status({message:"User not registered"})
    // }

    res.status(200).json({message:"User registered successfully"})

}

export const login=async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:"Enter email and password"})
    }
    console.log('!!!!!!!!!!!!!!!!!',email,password)
    try{
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const comparepass=await user.comparePassword(password);
    if(!comparepass){
        return res.status(400).json({message:"Invalid Credentials"})
    } 

    const accessToken=user.generateAccessToken(user)
    res
    .cookie('accessToken',accessToken,{
        httpOnly:true,
        maxAge:3*24*60*60*1000
    })
    .status(200).json({message:"Logged in successfully"})
}
catch(error){
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(error => error.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({message:error})
}
}

export const dashboard=async (req,res)=>{
    const user=req.user
    try{
    const userloggedin=await User.findById({_id:user.id})
    res.status(200).json({message:"Welcome to Notes App", user:userloggedin })
    }
    catch(err){
        res.status(400).json({message:err})
    }
}


export const logout=async (req,res)=>{
    res.clearCookie('accessToken');
    res.status(200).json({message:"Logged out successfully"})
}