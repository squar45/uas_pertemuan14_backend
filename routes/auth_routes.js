import express from "express";
import env from "dotenv"
import jwt from "jsonwebtoken"
env.config()

const auth_route = express.Router()
const {APP_ID, API_SECRET} = process.env

// dapatkan data dari env
auth_route.post("/auth", async(req,res)=>{
    try {
        const {app_id, api_secret} = await req.body

        // check apakah api_id dan api_secret salah
        if(app_id==APP_ID && api_secret==API_SECRET) {
        
            // jika benar
        let createToken = await jwt.sign({
            app_name : "project_final_covid",
            author : "izzudin alqosam",
            created_at: "27 Jan 2022"
        },API_SECRET)

        res.status(200).json({
            success: true,
            message : "you are authorize, please input token to open bearer.",
            token : createToken 
        })
            return
        }

        // jika salah
        res.status(401).json({
            message: "unauthorized"
        })

    } catch (error) {
        res.status(422).json({
            success:false,
            error : error.message
        })
        
    }
})

export default auth_route