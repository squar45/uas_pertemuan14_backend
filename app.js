import express from "express";
import cors from "cors";
import env from "dotenv";
import cookieParser from "cookie-parser"
import patient_route from "./routes/patient_routes"
import auth_route from "./routes/auth_routes";
env.config()

const app = express()
//variable dari env 
const {PORT} = process.env

//middleware 
app.use(cors({
    origin : "*",
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

//route
app.use(patient_route)
app.use(auth_route)

app.listen(PORT, ()=>{
    console.log(`server terhubung ke port : ${PORT}`)
})


