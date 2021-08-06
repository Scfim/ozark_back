import Queries from"../App/Queries.js"
import{databaseSchema,clientsSchema} from"../App/Schema.js"
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const{id,name,adress,phone,mail,date,time,userId}=clientsSchema;
const clients=databaseSchema;
class Client{
    //INSERT client
static async insert(args,callback) {
    const clientId = uuidv4();
    //verify if clientId exist
    //=====================
    Queries.getSpecificFields({
        table: `${clients}`,
        fields: `${id}`,
        whereCloseFields: `${id}=?`,
        arguments: [clientId],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            this.signUp(args, callback);
          } else {
                Queries.addData({
                    table: `${clients}`,
                    fields: `${id},${name},${adress},${phone},${mail},${date},${time},${userId}`,
                    values:`?,?,?,?,?,NOW(),NOW(),?`,
                    arguments:[
                        clientId,
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
//GET client
static async get(args, callback) {
    await Queries.getAll({
    table: `${clients}`,
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
//GET clients
static async getAll(callback) {
    await Queries.getAll({
      table: `${clients}`,
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
export default  Client