import Todo from '../models/todoModel.js'

export const addPost=async(req,res)=>{
    try{
    const {notes}=req.body;
    const user=req.user
    const id=user.id
    if(!notes){
        return res.status(400).json({message:"Write a note"})
    }

    const newPost=await Todo.create({notes,user:id})
    return res.status(200).json({message:"Note saved successfully",user:id})
}
catch(error){
    res.status(400).json({error:error})
}
}

export const deletePost=async (req,res)=>{
    const {id}=req.params;
    const delPost=await Todo.findByIdAndDelete({_id:id},{new:true});
    if(!delPost){
        return res.status(400).json({message:"Error while deleting Post"})
    }

    res.status(200).json({message:"Post deleted successfully"})
}

export const updatePost=async (req,res)=>{
    const {id}=req.params;
    if(req.body.notes===''){
        return res.status(400).json({message:'Write a note'})
    }
    const updateduser=await Todo.findByIdAndUpdate({_id:id}, req.body,{new:true})

    await updateduser.save();

    if(!updateduser){
        return res.status(400).json({message:"Failed to update user"})
    } 

    return res.status(200).json({message:"User updated Successfully"})
}

export const getPosts=async (req,res)=>{
    // in postman http://localhost:2000/api/v1/todo/getposts?page='2'
    try{
        const user=req.user
        const id=user.id;
        const page=parseInt(req.query.page)
        const limit=4;
        const skip=(page-1)*limit;
        // for limit 4, skip=(page-1)*limit

        const total=await Todo.countDocuments({"user":id});
        const todos=await Todo.find({user:id}).skip(skip).limit(limit);

        res.status(200).json({todos,total,page,skip,user,limit})
    }
    catch(error){
        res.status(400).json(error)
    }

}

export const getSinglePost=async (req,res)=>{
    const {id}=req.params
    const notes =await Todo.findById({_id:id})
    if(!notes){
        return res.status(400).json({message:"No post found"})
    }

    res.status(200).json({notes})
}

