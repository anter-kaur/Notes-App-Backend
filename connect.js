import mongoose from 'mongoose'

const connect=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to database')
    })
    .catch((error)=>{
        console.log("Error while connecting to database ",error)
    })
}

export default connect