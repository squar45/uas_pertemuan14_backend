import express, {response, request } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config


const tokenCheck = (req = request, res = response, next)=>{

    let token = req.headers["authorization"]

    if(!token){
        res.status(401).json({
            message : "unauthorize, insert real bearer token"
        })
        return
    }

    token = token.split(" ")[1]

    const verif = jwt.verify(token, process.env.API_SECRET)

    if(!verif){
        res.status(401).json({
            message : "Token error"
        })
        return
    }

    next()
}

export default tokenCheck