import Etablishement from "../Models/MEtablishement.js";
import validator from"../Controllers/Validator.js";
import express from 'express';
import sessionHandler from "../App/session.js"
import jwtVerify from "../App/VerifyToken.js"
const routes=express.Router();

routes.post('/add',(request,response)=>{
    const{name,mail,phone,webSite,logo,bp,adress}=request.body;
    if(validator(name).isString().check()){
        if(validator(phone).isPhoneNumber().check()){
            if(validator(adress).isString().check()){
                Etablishement.insert({
                    name: name,
                    mail:mail,
                    phone:phone,
                    webSite: webSite,
                    logo: logo,
                    bp:bp,
                    adress:adress,
                }).then((result)=>response.send(result))
            }else response.send({type:"failure", message: "L'adress doit être un text et elle est obligatoire" });        
        }else response.send({type:"failure", message: "Numéro de téléphone invalide" }); 
    }else response.send({type:"failure", message: "Le nom doit être un text et elle est obligatoire" }); 
})
routes.get('/get',(request,response)=>{
    Etablishement.get(
        (result)=>response.send(result)
    )
})
export default routes