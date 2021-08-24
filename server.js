
/**
 * This is the entry point of your express application and mysql database
 * Just follow the rules  in the readme file and your will ready to use express server
 * 
 * This boilerplate is based on express and its structure is provided by the author of this file
 * Author: SCFIM corp
 */

/**
 * First step import all dependencies usable in server config here
 */

import express from "express"
import cors from "cors"
import database from "./App/Config.js";
import etabliRouter from "./Controllers/CEtablishement.js";
import userRouter from "./Controllers/CUsers.js"
import categoriesRouter from "./Controllers/CCategories.js"
import marksRouter from "./Controllers/CMarks.js"
import SubCategorieRouter from "./Controllers/CSubCategories.js";
import productRouter from "./Controllers/CPoducts.js"
import exerciseRouter from "./Controllers/CExercises.js"
import providerRouter from "./Controllers/CProviders.js"
import clientRouter from "./Controllers/CClient.js"
import bookingRouter from "./Controllers/CBookings.js"
import outputRouter from "./Controllers/COutput.js"
import paymentRouter from "./Controllers/CPayments.js"

import cookieParser from "cookie-parser"


 const app = express();
 app.use(cookieParser())
 app.use(express.json());

 app.use(cors({
  methods:["GET","POST"],
  origin:["http://192.168.0.100:3000", "http://localhost:3000"],
  credentials:true
}));
app.use("/etablishement", etabliRouter);
app.use('/users',userRouter);
app.use('/categories',categoriesRouter)
app.use('/marks',marksRouter)
app.use('/subCategories',SubCategorieRouter)
app.use('/products',productRouter)
app.use('/exercises',exerciseRouter)
app.use('/providers',providerRouter)
app.use('/clients',clientRouter)
app.use('/bookings',bookingRouter)
app.use('/output',outputRouter)
app.use('/payments',paymentRouter)
const PORT = process.env.PORT || 2723;
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
