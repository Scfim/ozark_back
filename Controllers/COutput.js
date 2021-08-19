import express from "express";
import Output from "../Models/MOutputs.js"
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
routes.post("/add",sessionHandler,(request, response)=>{
    
})