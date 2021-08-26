import Queries from'../App/Queries.js'
import{databaseSchema,marksSchema} from'../App/Schema.js'

import { v4 as uuidv4 } from "uuid";
const{id,name,description,date,time,userId,subCategorieId} =marksSchema;
const {marks}=databaseSchema
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
              Queries.getSpecificFields({
                table: `${marks}`,
                fields: `${name}`,
                whereCloseFields: `${name}=? and ${subCategorieId}=?`,
                arguments: [args.name,args.subCategorieId],
              }).then((data)=>{
                if (data.length === 1 || data.length >= 1) {
                    callback({
                      type:"failure", message:"La marque avec le meme nom existe déjà"
                    })
                  } else {
                      Queries.addData({
                          table: `${marks}`,
                          fields: `${id},${name},${description},${date},${time},${userId},${subCategorieId}`,
                          values:`?,?,?,NOW(),NOW(),?,?`,
                          arguments:[markId,args.name,args.description,args.userId,args.subCategorieId]
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
              }
              ).catch((err)=>{
                callback({
                    type: "failure", 
                    message:"Erreur lor de la verification du nom"
                })
            })
            }
          }).catch((err)=>{
              callback({
                  type: "failure", 
                  message:"Erreur lor de la verification de l'id"
              })
          });
          
    }
    //GET MARK
    static async get(args, callback) {
      const query=`select marks.mark_id,marks.mark_name,sub_categories.sub_categorie_name,sub_categories.sub_categorie_id from marks inner join sub_categories on sub_categories.sub_categorie_id=marks.sub_categorie_id where marks.mark_id=?;`
        await Queries.myQuery({
        table:  query,    
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
      const query=`select marks.mark_id,marks.mark_name,sub_categories.sub_categorie_name,sub_categories.sub_categorie_id from marks inner join sub_categories on sub_categories.sub_categorie_id=marks.sub_categorie_id where marks.mark_id!=?;`
        await Queries.myQuery({
          query: query,
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
    static async getSubCategory(args,callback) {
      const query=`SELECT * FROM sub_categories WHERE sub_categorie_name like ?`
        await Queries.myQuery({
          query:query,
          arguments: [`%${args.subCategoryName}%`],
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
    static async update(args, callback){
      Queries.getSpecificFields({
        table: `${marks}`,
        fields: `${name}`,
        whereCloseFields: `${name}=? and ${subCategorieId}=?`,
        arguments: [args.name,args.subCategorieId],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            callback({
              type:"failure", message:"La marque avec le meme nom existe déjà"
            })
          } else {
              Queries.update({
                  table: `${marks}`,
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
    static async delete(args, callback) {
      await Queries.removeData({
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
          message: "Echec de suppression veillez vous rassurez que la marque n'est lié avec des produits",
          err,
          });
      });
  }
}
export default Marks;