import Queries from'../App/Queries.js'
import{databaseSchema,marksSchema} from'../App/Schema.js'
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const{id,name,description,date,time,userId} =marksSchema;
const marks=databaseSchema
class Marks{
    static async insert(args, callback) {
        const markId = uuidv4();
        //verify if userId exist
        //=====================
        Queries.getSpecificFields({
            table: `${marks}`,
            fields: `${id}`,
            whereCloseFields: `${id}=?`,
            arguments: [markId],
          }).then((data)=>{
            if (data.length === 1 || data.length >= 1) {
                this.signUp(args, callback);
            } else {
                Queries.addData({
                    table: `${marks}`,
                    fields: `${id},${name},${description},${date},${time},${userId}`,
                    values:`?,?,?,NOW(),NOW(),?`,
                    arguments:[markId,args.name,args.description,args.userId]
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
          }).catch((err)=>{
              callback({
                  type: "failure", 
                  message:"Erreur lor de la verification de l'id"
              })
          });
          
    }
    //GET CATEGORIE
    static async get(args, callback) {
        await Queries.getAll({
        table: `${marks}`,
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
    //GET marks
    static async getAll(callback) {
        await Queries.getAll({
          table: `${marks}`,
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
export default Marks;