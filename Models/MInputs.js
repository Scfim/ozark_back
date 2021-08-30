import Queries from"../App/Queries.js"
import{databaseSchema,inputSchema} from"../App/Schema.js"
import { v4 as uuidv4 } from "uuid";
const{id,productId,providerId,quantity,unitePrice,lot,expireDate,exerciseId,dateRecord,timeRecord,comment,date,time,userId} =inputSchema;
const {input}=databaseSchema;
export default class Input{
        //INSERT INPUT
static async insert(args,callback) {
    const inputId = uuidv4();
    //verify if inputId exist
    //=====================
    Queries.getSpecificFields({
        table: `${input}`,
        fields: `${id}`,
        whereCloseFields: `${id}=?`,
        arguments: [inputId],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            this.signUp(args, callback);
          } else {
                Queries.addData({
                    table: `${input}`,
                    fields: `${id},${productId},${providerId},${quantity},${unitePrice},${exerciseId},${dateRecord},${comment},${date},${time},${userId}`,
                    values:`?,?,?,?,?,?,?,?,NOW(),NOW(),?`,
                    arguments:[
                        inputId,
                        args.productId,
                        args.providerId,
                        args.quantity,
                        args.unitePrice,                       
                        args.exerciseId,
                        args.dateRecord,
                        args.comment,
                        args.userId
                    ]
                }).then((data) =>                                       
                    callback({
                    type: "success",
                    message:"Enregistrement effectué"
                    })
                ).catch((err) =>  {
                    console.log(err)
                    callback({
                    type: "failure",
                    message:"Echec d'enregistrement",
                    err,
                    })
                }                            
                    
                );
          }
      })
}
//GET INPUT
static async get(args, callback) {
    await Queries.getAll({
    table: `${input}`,
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
static async getProvider(args, callback) {
    await Queries.getAll({
    table: `providers`,
    whereCloseFields: `provider_name like?`,
    arguments: [`%${args.providerName}%`],
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
static async getProduct(args, callback) {
    await Queries.getAll({
    table: `products`,
    whereCloseFields: `product_name like ?`,
    arguments: [`%${args.productName}%`],
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
//GET input
static async getAll(callback) {
    await Queries.getAll({
      table: `${input}`,
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
static async inputJournal(args,callback) {
    await Queries.getAll({
      table: `${input}`,
      whereCloseFields: `${date}=?`,
      arguments: [args.data],
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