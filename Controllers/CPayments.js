import express from "express";
const routes = express.Router();
import validator from "./Validator.js";
import Exercise from "../Models/MExercises.js"
import Payement from "../Models/MPayments.js"
routes.post("/add",sessionHandler,(request, response)=>{
    if(request.session.user){
        const userId=request.session.user.data[0].user_id        
        Exercise.getCourent((resultExercise)=>{
            if(resultExercise.data.type === "success" && resultExercise.data.data.length>0){            
                const exerciseId= resultExercise.data.data.exercise_id
                if(exerciseId!==null&&exerciseId!==""&&exerciseId!==undefined){
                    Payement.insert({
                        referenceId:referenceId,
                        dateRecord: dateRecord,
                        timeRecord:timeRecord,
                        mount:mount,
                        envoy:envoy,
                        exerciseId:exerciseId,
                        userId:userId,
                    },(result)=>response.send(result))
                }else response.send({ type:"failure", message: "L'exercise est null" });  
            }else response.send({ type:"failure", message: "Echec de recuperation de l'exercice" }); 
        });
    }else response.send({ type:"failure", message: "Vous devez être connecté pour éffectuer cette opération" });
})
export default routes