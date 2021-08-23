import express from "express";
import Output from "../Models/MOutputs.js"
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
import Ouptut from "../Models/MOutputs.js";
routes.post("/add",sessionHandler,(request, response)=>{
    const{datOutput}= request.body.datOutput
    const{envoy,dateRecord,timeRecord}=request.body
    Ouptut.insert({
        bookingId:bookingId,
        reference: reference,
        outputNumber:outputNumber,
        quantity:quantity,
        unitePrice:unitePrice,                           
        exerciseId:exerciseId,
        dateRecord:dateRecord,
        timeRecord:timeRecord,
        perisable:perisable,
        envoy:envoy,
        userId:userId
    },(result)=>response.send(result))
})
export default routes