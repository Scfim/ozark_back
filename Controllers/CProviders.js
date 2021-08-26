import express from "express";
import Providers from "../Models/MProviders.js";
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
          Providers.insert(
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
  const providerId = request.body.providerId;
  if (request.session.user) {
    Providers.get(
      {
        id: providerId,
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
    Providers.getAll((result) => response.send(result));
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/delete", sessionHandler, (request, response) => {
  const providerId = request.body.providerId;
  if (request.session.user) {
    Providers.delete(
      {
        id: providerId,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/update", sessionHandler, (request, response) => {
  const { field, value, providerId } = request.body;
  if (request.session.user) {
    if (validator(providerId).isString().check() === true) {
      if (validator(field).isString().check() === true) {
        if (validator(value).isString().check() === true) {
          if (field === "clientMail") {
            if (validator(value).isEmailAddress().check() === true) {
              Providers.update(
                {
                  field: field,
                  value: value,
                  providerId: providerId,
                },
                (result) => {
                  response.send(result);
                }
              );
            } else
              response.send({ type: "failure", message: `Adress invalide` });
          } else if (field === "clientPhone") {
            if (validator(value).isPhoneNumber().check() === true) {
              Providers.update(
                {
                  field: field,
                  value: value,
                  providerId: providerId,
                },
                (result) => {
                  response.send(result);
                }
              );
            } else
              response.send({
                type: "failure",
                message: `Le numéro est invalide`,
              });
          } else {
            Providers.update(
              {
                field: field,
                value: value,
                providerId: providerId,
              },
              (result) => {
                response.send(result);
              }
            );
          }
        } else
          response.send({
            type: "failure",
            message: `Aucune valeur n'a été donnée!`,
          });
      } else
        response.send({
          type: "failure",
          message: `Veillez specifier l'élement a modifier !`,
        });
    } else
      response.send({
        type: "failure",
        message: `L'identifiant du client doit etre de ty texte !`,
      });
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour effectuer cette opération",
    });
});
export default routes;
