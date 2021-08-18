import Queries from"../App/Queries.js"
import{databaseSchema,providersSchema} from"../App/Schema.js"

import { v4 as uuidv4 } from "uuid";
const{id,name,adress,phone,mail,date,time,userId}=providersSchema;
const {providers}=databaseSchema;
class Provider{
    //INSERT PROVIDER
static async insert(args,callback) {
    const providerId = uuidv4();
    //verify if providerId exist
    //=====================
    Queries.getSpecificFields({
        table: `${providers}`,
        fields: `${id}`,
        whereCloseFields: `${id}=?`,
        arguments: [providerId],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            this.signUp(args, callback);
          } else {
                Queries.addData({
                    table: `${providers}`,
                    fields: `${id},${name},${adress},${phone},${mail},${date},${time},${userId}`,
                    values:`?,?,?,?,?,NOW(),NOW(),?`,
                    arguments:[
                        providerId,
                        args.name,
                        args.adress,
                        args.phone,
                        argsa.mail,
                        args.userId
                    ]
                }).then((data) =>                                       
                    callback({
                    type: "success",
                    })
                ).catch((err) =>                              
                    callback({
                    type: "failure",
                    message:"Echec d'enregistrement",
                    err,
                    })
                );
          }
      })
}
//GET PROVIDER
static async get(args, callback) {
    await Queries.getAll({
    table: `${providers}`,
    whereCloseFields: `${id}=?`,
    arguments: [args.id],
    })
    .then((data) => {
        callback({
        type: "success",
        data,
        });
    })
    .catch((err) => {
        callback({
        type: "failure",
        err,
        });
    });
}
//GET providers
static async getAll(callback) {
    await Queries.getAll({
      table: `${providers}`,
      whereCloseFields: `${id}!=?`,
      arguments: ["arg#$##$@#@#2s.id"],
    })
      .then((data) => {
        callback({
          type: "success",
          data,
        });
      })
      .catch((err) => {
        callback({
          type: "failure",
          err,
        });
      });
}
}
export default  Provider