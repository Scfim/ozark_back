import express from "express";
import Marks from "../Models/MMarks.js"
const routes = express.Router();
import validator from "./Validator.js";
import jwt from "jsonwebtoken"
import sessionHandler from "../App/session.js"
routes.post("/add",sessionHandler, (request, response)=>{
    const  {name,description,}= request.body;
    if(request.session.user){
        const userId=request.session.user.data[0].user_id
        if(validator(name).isString().check()){
            if(validator(description).isString().check){
                Marks.insert({
                    name:name,
                    description: description,
                    userId:userId,
                    subCategorieId:subCategorieId
                },
                (result) => {
                    response.send(result);
                
                })
            }else response.send({ type:"la description doit être du type chaine des caractaire" });
        }else response.send({ type:"failure", message: "Le nom doit être du type chaine des caractaire" });
     }else response.send({ type:"failure", message: "Vous devez être connecté pour effectuer cette opération" });
    
})
routes.post("/getOne",sessionHandler, (request, response)=>{
   const markId=request.body.markId
    if(request.session.user){
        Marks.get({
            id:markId,
        },(result)=>response.send(result))
    }else response.send({ type:"failure", message: "Vous devez être connecté pour éffectuer cette opération" });
    
})
routes.post("/getAll",sessionHandler, (request, response)=>{   
    if(request.session.user){
        Marks.getAll((result)=>response.send(result))
    }else response.send({ type:"failure", message: "Vous devez être connecté pour éffectuer cette opération" });
    
})
export default routes