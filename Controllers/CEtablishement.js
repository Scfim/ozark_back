import Etablishement from "../Models/MEtablishement.js";
import validator from "../Controllers/Validator.js";
import express from "express";
import sessionHandler from "../App/session.js";
const routes = express.Router();

routes.post("/add", (request, response) => {
  const { name, mail, phone, webSite, logo, bp, adress } = request.body;
  if (validator(name).isString().check()) {
    if (validator(phone).isPhoneNumber().check()) {
      if (validator(adress).isString().check()) {
        Etablishement.insert({
          name: name,
          mail: mail,
          phone: phone,
          webSite: webSite,
          logo: logo,
          bp: bp,
          adress: adress,
        }).then((result) => response.send(result));
      } else
        response.send({
          type: "failure",
          message: "L'adress doit être un text et elle est obligatoire",
        });
    } else
      response.send({
        type: "failure",
        message: "Numéro de téléphone invalide",
      });
  } else
    response.send({
      type: "failure",
      message: "Le nom doit être un text et elle est obligatoire",
    });
});
routes.get("/get", (request, response) => {
  Etablishement.get((result) => response.send(result));
});
routes.post("/update", sessionHandler, (request, response) => {
  const { field, value, Name } = request.body;
  if (request.session.user) {
    if (validator(Name).isString().check() === true) {
      if (validator(field).isString().check() === true) {
        if (validator(value).isString().check() === true) {
          if (field === "Mail") {
            if (validator(value).isEmailAddress().check() === true) {
              User.update(
                {
                  field: field,
                  value: value,
                  name: Name,
                },
                (result) => {
                  response.send(result);
                }
              );
            } else
              response.send({ type: "failure", message: `Adress invalide` });
          } else if (field === "Phone") {
            if (validator(value).isPhoneNumber().check() === true) {
              User.update(
                {
                  field: field,
                  value: value,
                  name: Name,
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
          } else if (field === "webSite") {
            if (validator(value).isString().check() === true) {
              User.update(
                {
                  field: field,
                  value: value,
                  name: Name,
                },
                (result) => {
                  response.send(result);
                }
              );
            } else
              response.send({
                type: "failure",
                message: `Le site  web est invalide`,
              });
          } else if (field === "bp") {
            if (validator(value).isString().check() === true) {
              User.update(
                {
                  field: field,
                  value: value,
                  name: Name,
                },
                (result) => {
                  response.send(result);
                }
              );
            } else
              response.send({ type: "failure", message: `La boite postal` });
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
      response.send({ type: "failure", message: `le nomdoit etre un text` });
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour effectuer cette opération",
    });
});

export default routes;
