import express from "express";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js";
import Ouptut from "../Models/MOutputs.js";
import Exercise from "../Models/MExercises.js";
routes.post("/add", sessionHandler, (request, response) => {
  const { dataOutput } = request.body.dataOutput;
  const { envoy, dateRecord, timeRecord } = request.body;
  if (request.session.user) {
    const userId = request.session.user.data[0].user_id;
    Exercise.getCourent((resultExercise) => {
      if (
        resultExercise.data.type === "success" &&
        resultExercise.data.data.length > 0
      ) {
        const exerciseId = resultExercise.data.data.exercise_id;
        if (
          exerciseId !== null &&
          exerciseId !== "" &&
          exerciseId !== undefined
        ) {
          for (let i = 0; i < dataOutput.length; i++) {
            Ouptut.insert(
              {
                bookingId: dataOutput[i].booking_id,
                reference: dataOutput[i].booking_reference_id,
                outputNumber: outputNumber,
                quantity: dataOutput[i].quantity,
                unitePrice: dataOutput[i].unitePrice,
                exerciseId: exerciseId,
                dateRecord: dateRecord,
                timeRecord: timeRecord,
                perisable: perisable,
                envoy: envoy,
                userId: userId,
              },
              (result) => response.send(result)
            );
          }
        } else
          response.send({ type: "failure", message: "L'exercise est null" });
      } else
        response.send({
          type: "failure",
          message: "Echec de recuperation de l'exercice",
        });
    });
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
export default routes;
