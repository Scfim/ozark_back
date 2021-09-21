import express from "express";
import Ouptut from "../Models/MOutputs.js";
const routes = express.Router();
import sessionHandler from "../App/session.js";
import jwtVerify from "../App/VerifyToken.js";
routes.post("/getStatementOfOutput", [sessionHandler,jwtVerify], (request, response) => {
    const {bookingNumber} = request.body;
    console.log(bookingNumber)
    if (request.session.user) {
        Ouptut.getStatementOfOutput(
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
routes.post("/getJournalOutput", [sessionHandler,jwtVerify], (request, response) => {
    const {dateRecord} = request.body;
    console.log(bookingNumber)
    if (request.session.user) {
        Ouptut.getJournalOutput(
        {
          dateRecord: dateRecord,
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