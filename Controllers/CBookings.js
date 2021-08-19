import express from "express";
import Booking from "../Models/MBookings.js"
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
routes.post("/add",sessionHandler,async (request, response)=>{
    var bookingCount=0;
    Booking.getCount((result)=>bookingCount=result.data[0].count+1)
    Booking.insert({
        productId: productId,
        clientId:clientId,
        quantity:quantity,
        unitePrice:unitePrice,
        number:bookingCount,
        description:description,
        exerciseId:exerciseId,
        dateRecord:dateRecord,
        timeRecord:timeRecord,
        userId:userId,
    })
})