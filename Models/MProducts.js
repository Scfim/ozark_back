import Queries from"../App/Queries.js"
import{databaseSchema,productsSchema} from"../App/Schema.js"
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const products=databaseSchema
const{id,subCategorieId,markId,name,dosage,forme,format,alertStock,date,time,userId} = productsSchema;
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
                Queries.addData({
                    table: `${products}`,
                    fields: `${id},${subCategorieId},${markId},${name},${dosage},${forme},${format},${alertStock},${date},${time},${userId}`,
                    values:`?,?,?,?,?,?,?,?,NOW(),NOW(),?`,
                    arguments:[
                        productId,
                        args.subCategorieId,
                        args.markId,
                        args.name,
                        argsa.dosage,
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
//GET products
static async getAll(callback) {
    await Queries.getAll({
      table: `${products}`,
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
// SELECT SUB CATEGORIES
static async getSubCategories(args, callback) {    
    await Queries.myQuery({
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
      
    await Queries.myQuery({
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
}
export default Product;