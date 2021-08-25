import Queries from'../App/Queries.js'
import{databaseSchema,categoriesSchema} from'../App/Schema.js'

import { v4 as uuidv4 } from "uuid";
const {id,name,type,date,time,userId}=categoriesSchema;
const{categories}=databaseSchema;
class Categories{
    //INSERT CATEGORIE
    static async insert(args,callback) {
        const categorieId = uuidv4();
        //verify if categorieId exist
        //=====================
        Queries.getSpecificFields({
            table: `${categories}`,
            fields: `${id}`,
            whereCloseFields: `${id}=?`,
            arguments: [categorieId],
          }).then((data)=>{
            if (data.length === 1 || data.length >= 1) {
                this.signUp(args, callback);
              } else {
                Queries.getSpecificFields({
                  table: `${categories}`,
                  fields: `${name}`,
                  whereCloseFields: `${name}=?`,
                  arguments: [args.name],
                }).then((data)=>{
                  if (data.length === 1 || data.length >= 1) {
                      callback({
                        type:"failure", message:"La categorie avec le meme nom existe déjà"
                      })
                    } else {
                        Queries.addData({
                            table: `${categories}`,
                            fields: `${id},${name},${type},${date},${time},${userId}`,
                            values:`?,?,?,NOW(),NOW(),?`,
                            arguments:[categorieId,args.name,args.type,args.userId]
                        }).then((data) =>                                       
                            callback({
                            type: "success",message:"Enregistrement effectué"
                            })
                        ).catch((err) =>                              
                            callback({
                            type: "failure",
                            message:"Echec d'enregistrement",
                            err,
                            })
                        );
                    }}).catch((err) =>                              
                      callback({
                        type: "failure",
                        message:"Echec de recuperation du nom",
                        err,
                      })
                    );
              }
          }).catch((err) =>                              
          callback({
            type: "failure",
            message:"Echec de recuperation de l'id",
            err,
          })
        );
    }
    static async update(args, callback){
      Queries.getSpecificFields({
        table: `${categories}`,
        fields: `${name}`,
        whereCloseFields: `${name}=?`,
        arguments: [args.name],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            callback({
              type:"failure", message:"La categorie avec le meme nom existe déjà"
            })
          } else {
              Queries.update({
                  table: `${categories}`,
                  fields: `${name}=?`,
                  whereCloseFields:`${id}=?`,
                  arguments:[args.name,args.id]
              }).then((data) =>                                       
                  callback({
                  type: "success",
                  message: "Modification effectuée"
                  })
              ).catch((err) =>                              
                  callback({
                  type: "failure",
                  message:"Echec d'enregistrement",
                  err,
                  })
              );
          }}).catch((err) =>                              
            callback({
              type: "failure",
              message:"Echec de recuperation du nom",
              err,
            })
          );
    }
    //GET CATEGORIE
    static async get(args, callback) {
        await Queries.getAll({
        table: `${categories}`,
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
    //GET CATEGORIES
    static async getAll(callback) {
        await Queries.getAll({
          table: `${categories}`,
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
      table: `${categories}`,
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
          message: "Echec de suppression veillez vous rassurez que la categorie  n'a de relation avec le sous categorie",
          err,
          });
      });
  }
}
export default Categories;

