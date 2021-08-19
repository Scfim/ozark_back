import express from "express";
import Booking from "../Models/MBookings.js"
import Reference from"../Models/MBookingReferences.js"
import Exercise from "../Models/MExercises.js"
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
routes.post("/add",sessionHandler,async (request, response)=>{
    const{productId,clientId,quantity,unitePrice,description,dateRecord}=request.body;
    if(request.session.user){
        const userId=request.session.user.data[0].user_id
        Exercise.getCourent((resultExercise)=>{
            if(resultExercise.data.type === "success" && resultExercise.data.data.length>0){            
                const exerciseId= resultExercise.data.data.exercise_id
                if(exerciseId!==null&&exerciseId!==""&&exerciseId!==undefined){
                    Reference.getCount((resultRefe)=>{
                        if(resultRefe.data.type === "success" && resultRefe.data.data.length>0){
                            if(resultRefe.data.data.booking_reference_number!==null&&resultRefe.data.data.booking_reference_number!==""&&resultRefe.data.data.booking_reference_number!==undefined){
                            const refCount=resultRefe.data.data.booking_reference_number+1
                            Reference.insert({
                                number:refCount,                            
                                date:dateRecord,
                                time:dateRecord,
                                exerciseId:exerciseId,                            
                                userId:userId,
                            },(result)=>{
                                    if(result.data.type === "success"){
                                        Booking.insert({
                                            productId: productId,
                                            clientId:clientId,
                                            quantity:quantity,
                                            unitePrice:unitePrice,
                                            reference:result.data.id,
                                            description:description,
                                            exerciseId:exerciseId,
                                            dateRecord:dateRecord,
                                            timeRecord:dateRecord,
                                            userId:userId,
                                        },(result)=>response.send(result))
                                    }else response.send({ type:"failure", message: "Echec d'enregistrement de la commande" });
                            }) 
                            }else response.send({ type:"failure", message: "Le numero de la commande est null" });                        
                        }else response.send({ type:"failure", message: "Echec d'attribution du numero de commande" });
                    })
                }else response.send({ type:"failure", message: "L'exercise est null" });            
            }else response.send({ type:"failure", message: "Echec de récuperation de l'execice actif" });
        })
    }else response.send({ type:"failure", message: "Vous devez être connecté pour éffectuer cette opération" }); 
})