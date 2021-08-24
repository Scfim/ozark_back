import express from "express";
import Exercises from "../Models/MExercises.js";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js";
routes.post("/add", sessionHandler, (request, response) => {
  const { startDate, endDate } = request.body;
  if (request.session.user) {
    const userId = request.session.user.data[0].user_id;
    if (validator(startDate).isDate().check()) {
      if (validator(endDate).isDate().check()) {
        var diffDate = Math.floor(
          (Date.parse(endDate) - Date.parse(startDate)) / 86400000
        );
        if (diffDate > 28) {
          Exercises.insert(
            {
              startDate: startDate,
              endDate: endDate,
              userId: userId,
            },
            (result) => {
              response.send(result);
            }
          );
        } else
          response.send({
            type: "failure",
            message: "la date din doit être superieur a celui de debut",
          });
      } else
        response.send({
          type: "failure",
          message: "la date de debut est invalide",
        });
    } else
      response.send({
        type: "failure",
        message: "la date de fin est invalide",
      });
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getOne", sessionHandler, (request, response) => {
  const exerciseId = request.body.exerciseId;
  if (request.session.user) {
    Exercises.get(
      {
        id: exerciseId,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getAll", sessionHandler, (request, response) => {
  if (request.session.user) {
    Exercises.getAll((result) => response.send(result));
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
export default routes;
