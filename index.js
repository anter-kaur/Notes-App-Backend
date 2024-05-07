import express from 'express'
import dotenv from 'dotenv'
import connect from './connect.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'


const app=express();
dotenv.config()


app.use(express.json())

app.use(cors({origin:['http://localhost:3000',
'https://notes-app-ashen-iota.vercel.app/'
],
    credentials:true
}))

app.use(cookieParser())

if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials", true);
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });
}

import userRouter from './routes/userRouter.js'
import todoRouter from './routes/todoRouter.js'

app.use('/api/v1/user',userRouter);
app.use('/api/v1/todo',todoRouter)

connect();

app.get("/", (req, res) => {
return res.status(200).json({msg:"hello"})
});

app.listen(process.env.PORT,()=>{
    console.log(`Server running at port ${process.env.PORT}`)
})