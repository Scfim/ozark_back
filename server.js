
/**
 * This is the entry point of your express application and mysql database
 * Just follow the rules  in the readme file and your will ready to use express server
 * 
 * This boilerplate is based on express and its structure is provided by the author of this file
 * Author: SCFIM corp
 */

/**
 * First step import all depenecies usable in server config here
 */

import express from "express"
import session from "express-session"
import cors from "cors"
import cookieParser from "cookie-parser"
import Myconnection from "./App/Config.js";
import etabliRouter from "./Controllers/CEtablishement.js";



// import App from "./App/Specials.js"

// App.use("data").then((result)=>{
  
// })

/**
 * 
 */
 const app = express();


 app.use(cors({
  methods:["GET","POST"],
  origin:["http://192.168.0.100:3000", "http://localhost:3000"],
  credentials:true
}));

 app.use(express.json());
  app.use("/etablishement", etabliRouter);
 const PORT = process.env.PORT || 2723;
 app.listen(PORT, () => console.log(`Server start on port ${PORT}`));