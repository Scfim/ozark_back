import express from "express";
import Input from "../Models/MInputs.js";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js";
routes.post('/add', sessionHandler, (request, response)=>{
    const{productId,providerId,quantity,unitePrice,dateRecord,timeRecord,comment} = responserequest.body
    if(request.session.user){
        const userId=request.session.user.data[0].user_id        
        Exercise.getCourent((resultExercise)=>{
            if(resultExercise.data.type === "success" && resultExercise.data.data.length>0){            
                const exerciseId= resultExercise.data.data.exercise_id
                if(exerciseId!==null&&exerciseId!==""&&exerciseId!==undefined){
                    Input.insert({
                        productId:productId,
                        providerId: providerId,
                        quantity: quantity,
                        unitePrice: unitePrice,            
                        exerciseId:exerciseId,
                        dateRecord:dateRecord,
                        timeRecord: timeRecord,
                        comment: comment,
                        userId: userId
                    },(result)=> response.send(result))
            }else response.send({ type:"failure", message: "L'exercise est null" });  
        }else response.send({ type:"failure", message: "Echec de recuperation de l'exercice" }); 
        });
    }else response.send({ type:"failure", message: "Vous devez être connecté pour éffectuer cette opération" });
})
export default routes