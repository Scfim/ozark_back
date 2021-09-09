import express from "express";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
import jwtVerify from "../App/VerifyToken.js"
import Ouptut from "../Models/MOutputs.js";
import Exercise from "../Models/MExercises.js"
// routes.post("/add", [sessionHandler,jwtVerify],(request, response)=>{
routes.get("/add", async (request, response)=>{
    const outBookings=request.body.outBookings
    
    const{customer,booking_reference_id,daysDate}=request.body
    var verifyOperation=""
    
    if(request.session.user){
        const userId=request.session.user.data[0].user_id   
        var result=[]     
       await Exercise.getCurrent((resultExercise) => {
            if (resultExercise.type === "success" && resultExercise.data.length > 0) {
              const exerciseId = resultExercise.data[0].exercise_id;
                if(exerciseId!==null&&exerciseId!==""&&exerciseId!==undefined){
                    for(let i=0;i<outBookings.length;i++){
                        const out=await    Ouptut.insert({
                            bookingId:outBookings[i].booking_id,
                            productId:outBookings[i].product_id,
                            referenceId:booking_reference_id,                                                        
                            outputNumber:"",
                            quantity:outBookings[i].quantity,
                            unitePrice:outBookings[i].unite_price,                           
                            exerciseId:exerciseId,
                            dateRecord:daysDate,
                            envoy:customer,
                            userId:userId
                        },(result)=>{                            
                           if(result.type==="success"){                               
                               verifyOperation="success" 
                               response.send(result)                             
                            } 
                           else{
                               verifyOperation="failure" 
                               response.send(result)                           
                            }                            
                        })
                        result.push(out.type)
                        
                    }
                    
                                       
                }else response.send({ type:"failure", message: "L'exercise est null" });  
            }else response.send({ type:"failure", message: "Echec de recuperation de l'exercice" }); 
        });
    
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.get("/test",  (request, response)=>{
    console.log("ok ok")
})
export default routes;
