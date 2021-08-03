import Etablishement from "../Models/MEtablishement.js";
import express from 'express';
const routes=express.Router();

routes.get('/add',(request,response)=>{
    Etablishement.insert({
        name: 'xcorporation',
        mail:'mail@gmail.com',
        phone:'0994603189',
        webSite: 'http://scfm.com',
        logo: 'logo.png',
        bp:'190',
        adress:'butembo'
    }).then((data)=>console.log(data)).catch((err)=>console.log(err))
})
export default routes