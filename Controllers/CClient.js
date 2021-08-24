import express from "express";
import Clients from "../Models/MClients.js";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js";
routes.post("/add", sessionHandler, (request, response) => {
  const { name, type, adress, phone, mail } = request.body;
  if (request.session.user) {
    const userId = request.session.user.data[0].user_id;
    if (validator(name).isString().check()) {
      if (validator(adress).isString().check) {
        if (validator(phone).isString().check) {
          Clients.insert(
            {
              name: name,
              adress: adress,
              phone: phone,
              mail: mail,
              userId: userId,
            },
            (result) => {
              response.send(result);
            }
          );
        } else
          response.send({ type: "failure", message: "le némero est invalide" });
      } else
        response.send({
          type: "failure",
          message: "l'adress doit être du type chaine des caractaire",
        });
    } else
      response.send({
        type: "failure",
        message: "Le nom doit être du type chaine des caractaire",
      });
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour effectuer cette opération",
    });
});
routes.post("/getOne", sessionHandler, (request, response) => {
  const clientId = request.body.clientId;
  if (request.session.user) {
    Clients.get(
      {
        id: clientId,
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
    Clients.getAll((result) => response.send(result));
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
export default routes;
