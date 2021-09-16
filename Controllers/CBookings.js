import express from "express";
import Booking from "../Models/MBookings.js";
import Reference from "../Models/MBookingReferences.js";
import Exercise from "../Models/MExercises.js";
import Payment from "../Models/MPayments.js";
import Ouptut from "../Models/MOutputs.js";
const routes = express.Router();
import validator from "./Validator.js";

import sessionHandler from "../App/session.js";
import jwtVerify from "../App/VerifyToken.js";


routes.post("/add", [sessionHandler, jwtVerify], async (request, response) => {
  // const{productId,clientId,quantity,unitePrice,description,dateRecord}=request.body;
  const { isCash, allowOutPut } = request.body;
  const dataBooking = request.body.inputData;
  var referenceId = "";
  var verifyBooking = false;
  var verifyOperation=[]
  if (request.session.user) {
    const userId = request.session.user.data[0].user_id;
    Exercise.getCurrent((resultExercise) => {
      if (resultExercise.type === "success" && resultExercise.data.length > 0) {
        const exerciseId = resultExercise.data[0].exercise_id;

        if (
          exerciseId !== null &&
          exerciseId !== "" &&
          exerciseId !== undefined
        ) {
          Reference.getCount((resultRefe) => {
            if (resultRefe.type === "success" && resultRefe.data.length > 0) {
              if (
                resultRefe.data[0].count !== null &&
                resultRefe.data[0].count !== "" &&
                resultRefe.data[0].count !== undefined
              ) {
                const refNumber = resultRefe.data[0].count + 1;
                Reference.insert(
                  {
                    number: refNumber,
                    exerciseId: exerciseId,
                    userId: userId,
                  },
                  (resultReference) => {
                    referenceId = resultReference.id;
                    if (resultReference.type === "success") {
                      for (var i = 0; i < dataBooking.length; i++) {
                         Booking.insert(
                          {
                            productId: dataBooking[i].productId,
                            clientId: dataBooking[i].clientId,
                            quantity: dataBooking[i].quantity,
                            unitePrice: dataBooking[i].initialPrice,
                            reference: referenceId,
                            description: dataBooking[i].comment,
                            exerciseId: exerciseId,
                            dateRecord: dataBooking[i].daysDate,
                            userId: userId,
                          },
                          (resultBooking) => {
                            if (resultBooking.type === "success") {
                                verifyBooking=true  
                                verifyOperation.push("success")                            
                                response.send(resultBooking);                              
                            } else {
                                verifyBooking=false
                                verifyOperation.push("failure")
                              setVerify(false)
                              response.send({
                                type: "failure",
                                message:
                                  "Echec d'enregistrement de la commande numero " +
                                  dataBooking[i],
                              });
                              return;
                            }
                          }
                        );
                      }
                     
                      if (verifyOperation.includes("failure")) {
                        
                        if(isCash===true) {
                                Payment.insert({
                                    referenceId:referenceId,
                                    dateRecord:dataBooking[0].daysDate,
                                    mount:dataBooking[0].mount,
                                    envoy:dataBooking[0].client,
                                    exerciseId:exerciseId,
                                    userId:userId,
                                },(resultPayment)=>{
                                    if(resultPayment.type!=="success")response.send({ type:"failure", message: "Echec d'enregistrement du paiement" });
                                })

                        }

                        if (allowOutPut === true) {
                          Booking.get(
                            {
                              reference: referenceId,
                            },
                            (resultBooking) => {
                              if (
                                resultBooking.type === "success" &&
                                resultBooking.length > 0
                              ) {
                                const data = resultBooking.data;

                                for (var i = 0; i < data; i++) {
                                  Ouptut.insert(
                                    {
                                      bookingId: data[i].booking_id,
                                      reference: referenceId,
                                      outputNumber: "001",
                                      quantity: data[i].quantity,
                                      unitePrice: data[i].unite_price,
                                      exerciseId: exerciseId,
                                      dateRecord: dataBooking[0].daysDate,
                                      envoy: dataBooking[0].client,
                                      userId: userId,
                                    },
                                    (resultOutput) => {
                                      // if(resultOutput.type !== "success"){
                                      //     response.send({ type:"failure", message: "Echec d'enregistrement de la sortie numero "+data[i] });
                                      //     return;
                                      // }
                                      // else{
                                      //     response.send(resultOutput)
                                      // }
                                    }
                                  );
                                }
                              } else
                                response.send({
                                  type: "failure",
                                  message:
                                    "Echec de recuperation de la commande",
                                });
                            }
                          );
                        }
                      }
                    } else
                      response.send({
                        type: "failure",
                        message: "Echec d'enregistrement de la commande",
                      });
                  }
                );
              } else
                response.send({
                  type: "failure",
                  message: "Le numero de la commande est null",
                });
            } else
              response.send({
                type: "failure",
                message: "Echec d'attribution du numero de commande",
              });
          });
        } else
          response.send({ type: "failure", message: "L'exercise est null" });
      } else
        response.send({
          type: "failure",
          message: "Echec de récuperation de l'execice actif",
        });
    });
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getBookingLike", [sessionHandler,jwtVerify], (request, response) => {
  const {bookingNumber} = request.body; 
  if (request.session.user) {
    Reference.getRefrenceLike(
      {
        number: bookingNumber,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/billNumber", [sessionHandler,jwtVerify], (request, response)=>{
  if (request.session.user) {
    Reference.getCount(
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
})
export default routes;
