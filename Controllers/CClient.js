import express from "express";
import Clients from "../Models/MClients.js";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
import jwtVerify from "../App/VerifyToken.js";
routes.post("/add", [sessionHandler,jwtVerify], (request, response) => {
  const { name, type, adress, phone, mail } = request.body;
  if (request.session.user) {
    const userId = request.session.user.data[0].user_id;
    if (validator(name).isString().check()) {
      if (validator(adress).isString().check) {
        if (validator(phone).isPhoneNumber().check) {
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
routes.post("/getOne", [sessionHandler,jwtVerify], (request, response) => {
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
routes.post("/delete", [sessionHandler,jwtVerify], (request, response) => {
  const clientId = request.body.clientId;
  if (request.session.user) {
    Clients.delete(
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
routes.post("/getAll", [sessionHandler,jwtVerify], (request, response) => {
  if (request.session.user) {
    Clients.getAll((result) => response.send(result));
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/update", [sessionHandler,jwtVerify], (request, response) => {
  const { field, value,clientId } = request.body;
  if(request.session.user){    
    if(validator(clientId).isString().check()===true){
      if(validator(field).isString().check()===true){
        if(validator(value).isString().check()===true){
          if(field==="clientMail" ){
            if(validator(value).isEmailAddress().check()===true){
              Clients.update({
                field: field,
                value: value,
                clientId: clientId
              },
              (result) => {
                response.send(result);
              })
            }else response.send({type: "failure", message: `Adress invalide`});
            
          }else if(field==="clientPhone"){
            if( validator(value).isPhoneNumber().check()===true){
              Clients.update({
                field: field,
                value: value,
                clientId: clientId,
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
  }
} else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour effectuer cette opération",
    });
});
routes.post("/getClientLike", [sessionHandler,jwtVerify], (request, response) => {
  const clientName = request.body.clientName;
  if (request.session.user) {
    Clients.getClientLike(
      {
        name: clientName,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
export default routes;
