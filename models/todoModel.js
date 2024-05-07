import mongoose from 'mongoose'
import User from '../models/userModel.js'

const todoSchema=new mongoose.Schema({
    notes:{
        type:String,
        required:true
    } 
    ,
    user:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("Todo",todoSchema) 