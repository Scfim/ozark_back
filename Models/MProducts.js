import Queries from"../App/Queries.js"
import{databaseSchema,productsSchema} from"../App/Schema.js"

import { v4 as uuidv4 } from "uuid";
const {products}=databaseSchema
const{id,markId,name,dosage,forme,format,alertStock,date,time,userId} = productsSchema;
class Product{
//INSERT CATEGORIE
static async insert(args,callback) {
    const productId = uuidv4();
    //verify if productId exist
    //=====================
    Queries.getSpecificFields({
        table: `${products}`,
        fields: `${id}`,
        whereCloseFields: `${id}=?`,
        arguments: [productId],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            this.signUp(args, callback);
          } else {
            Queries.getSpecificFields({
                table: `${products}`,
                fields: `${name}`,
                whereCloseFields: `${name}=? and ${markId}=?`,
                arguments: [args.name,args.markId],
              }).then((data)=>{
                if (data.length === 1 || data.length >= 1) {
                    callback({
                      type:"failure", message:"La marque avec le meme nom existe déjà"
                    })
                  } else {
                        Queries.addData({
                            table: `${products}`,
                            fields: `${id},${markId},${name},${dosage},${forme},${format},${alertStock},${date},${time},${userId}`,
                            values:`?,?,?,?,?,?,?,NOW(),NOW(),?`,
                            arguments:[
                                productId,                        
                                args.markId,
                                args.name,
                                args.dosage,
                                args.forme,
                                args.format,
                                args.alertStock,
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
              }).catch((err) =>                              
                callback({
                    type: "failure",
                    message:"Erreur lors de la recuperation du nom",
                    err,
                })
          );
          }
      })
}
//GET CATEGORIE
static async get(args, callback) {
    await Queries.getAll({
    table: `${products}`,
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

static async delete(args, callback) {
    await Queries.removeData({
    table: `${products}`,
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
        message: "Echec de suppression veillez vous rassurez que le produit n'est lié avec d'autres opération",
        err,
        });
    });
}
//GET products
static async getAll(callback) {
   const query=`SELECT products.product_name,products.product_alert_stock,products.product_dosage,products.product_format,products.product_forme,marks.mark_name FROM products INNER JOIN marks on marks.mark_id=products.mark_id where products.product_id!=?`
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
// SELECT SUB CATEGORIES
static async getSubCategories(args, callback) {    
    await Queries.getAll({
    table: `sub_categories`,
    whereCloseFields: `sub_categorie_name like ?`,
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
// SELECT MARKS
static async getMark(args, callback) {      
    await Queries.getAll({
    table: `marks`,
    whereCloseFields: `mark_name like ?`,
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

static async update(args, callback){
    Queries.getSpecificFields({
      table: `${products}`,
      fields: `${name}`,
      whereCloseFields: `${name}=? and ${markId}=?`,
      arguments: [args.name,args.markId],
    }).then((data)=>{
      if (data.length === 1 || data.length >= 1) {
          callback({
            type:"failure", message:"La marque avec le meme nom existe déjà"
          })
        } else {
            Queries.update({
                table: `${products}`,
                fields: `${name}=?`,
                whereCloseFields: `${id}=?`,
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

}
export default Product;