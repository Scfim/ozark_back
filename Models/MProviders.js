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
                        args.mail,
                        args.userId
                    ]
                }).then((data) =>                                       
                    callback({
                    type: "success",
                    message:"Enregistrement effectué"
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
static async getProviderLike(args, callback) {
    await Queries.getAll({
    table: `${providers}`,
    whereCloseFields: `${name} like ? limit 10`,
    arguments: [`%${args.name}%`],
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
static async delete(args, callback) {
  await Queries.removeData({
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
      message: "Echec de suppression veillez vous rassurez que le fournisseur n'as d'autres opération",
      err,
      });
  });
}
static async update(args,callback) {
  var { field, value, providerId } = args,callback;
  switch (field) {
    case "providerName":
      field = name;
      break;
    case "providerAdress":
      field = adress;
      break;
    case "providerPhone":
      field = phone;
      break;
    case "providerMail":
      field = mail;        
      break;
    default:
      break;
  }
 
  await Queries.updateData({
    table: providers,
    fields: `${field} = ?`,
    whereCloseFields: `${id} = ?`,
    arguments: [value, providerId],
  }).then((data) =>
  callback({
    type: "success",
    data,
    message:"Modification effectuée"
  })
  )
  .catch((err) =>
    callback({
      type: "failure",
      err,
      message:"Echec dde modification"
    })
  );    
  
}
}
export default  Provider