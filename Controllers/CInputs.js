import express from "express";
import Input from "../Models/MInputs.js";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js";
import Exercise from "../Models/MExercises.js"
routes.post('/add', sessionHandler, (request, response)=>{
    const{productId,providerId,quantity,unitePrice,dateRecord,timeRecord,comment} = request.body
    if(request.session.user){
        const userId=request.session.user.data[0].user_id        
        Exercise.getCurrent((resultExercise)=>{
            if(resultExercise.type === "success" && resultExercise.data.length>0){            
                const exerciseId= resultExercise.data.exercise_id
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
routes.post("/getProvider", sessionHandler, (request, response) => {
    const providerName = request.body.providerName;
    if (request.session.user) {
      Input.getProvider(
        {
            providerName: providerName,
        },
        (result) => response.send(result)
      );
    } else
      response.send({
        type: "failure",
        message: "Vous devez être connecté pour éffectuer cette opération",
      });
});
routes.post("/getProduct", sessionHandler, (request, response) => {
    const productName = request.body.productName;
    if (request.session.user) {
      Input.getProduct(
        {
            productName: productName,
        },
        (result) => response.send(result)
      );
    } else
      response.send({
        type: "failure",
        message: "Vous devez être connecté pour éffectuer cette opération",
      });
});
export default routes