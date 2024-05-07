import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is requried'],
    },
    email:{
        type:String,
        required:[true,'Email is requried'],
        unique:[true,"Email is already registered"]
    },
    password:{
        type:String,
        required:[true,'Password is requried'],
    },
    phone:{
        type:String,
        required:[true,'Phone no. is requried'],
        unique:[true,"Phone no. is already registered"]
    }
},{timestamps:true})

userSchema.pre("save",function(){
    // if(!isModified(this.password)){
    //     return;
    // }
    this.password=bcrypt.hashSync(this.password,10)
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(user){
    return jwt.sign(
        {id:user._id},
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn:'2d'
        }
    )
}

export default mongoose.model('User',userSchema)