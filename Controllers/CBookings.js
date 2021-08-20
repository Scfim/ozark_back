import express from "express";
import Booking from "../Models/MBookings.js"
import Reference from"../Models/MBookingReferences.js"
import Exercise from "../Models/MExercises.js"
import Payment from "../Models/MPayments.js"
import Ouptut from "../Models/MOutputs.js"
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
routes.post("/add",sessionHandler,async (request, response)=>{
    // const{productId,clientId,quantity,unitePrice,description,dateRecord}=request.body;
    const{description,dateRecord,timeRecord,paymentCheck,outputCheck}=request.body
    const {dataBooking}=request.body.dataBooking
    const referenceId=""
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
                                time:timeRecord,
                                exerciseId:exerciseId,     
                                userId:userId,
                            },(resultReference)=>{
                                referenceId=resultReference.data.id
                                if(resultReference.data.type === "success"){
                                    Booking.insert(
                                        {
                                            productId: productId,
                                            clientId:clientId,
                                            quantity:quantity,
                                            unitePrice:unitePrice,
                                            reference:referenceId,
                                            description:description,
                                            exerciseId:exerciseId,
                                            dateRecord:dateRecord,
                                            timeRecord:timeRecord,
                                            userId:userId,
                                        },(resultBooking)=>{
                                        if(resultBooking.data.type === "success"){
                                            if(paymentCheck===true){
                                                Payment.insert({
                                                    referenceId:referenceId,
                                                    dateRecord:dateRecord,
                                                    timeRecord:timeRecord,
                                                    mount:mount,
                                                    envoy:envoy,
                                                    exerciseId:exerciseId,
                                                    userId:userId, 
                                                },(resultPayment)=>response.send(resultPayment))
                                            }
                                            // if(outputCheck==true){
                                            //     Ouptut.insert({
                                            //         bookingId:bookingId,
                                            //         reference: referenceId,
                                            //         outputNumber:outputNumber,
                                            //         quantity:quantity,
                                            //         unitePrice:unitePrice,                           
                                            //         exerciseId:exerciseId,
                                            //         dateRecord:dateRecord,
                                            //         timeRecord:timeRecord,
                                            //         perisable:perisable,
                                            //         envoy:envoy,
                                            //         userId:userId
                                            //     })
                                            // }
                                        }else response.send({ type:"failure", message: "Echec d'enregistrement de la réservation" });
                                    }
                                    )
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
routes.get('/test', (request, response)=>{
    const test=[{
        a:'test2',
        b:'bbbb'
    },{
        a:'test1',
        b:'bbbb1'}
    ]
    // console.log(test.length)
    for(var i=0; i < test.length; i++){
        console.log(test[i].b)
    }
})
export default routes