import Queries from "../App/Queries.js";
import {databaseSchema,etablishementSchema} from "../App/Schema.js";
const {name,mail,phone,webSite,logo,bp,adress,date}=etablishementSchema
const {etablishement}=databaseSchema
class Etablishement{
    static async insert(args,callback){
        Queries.addData({
            table:`${etablishement}`,
            fields:`${name},${mail},${phone},${webSite},${logo},${bp},${adress},${date}`,
            values:`?,?,?,?,?,?,?,NOW()`,
            arguments:[
                args.name,
                args.mail,
                args.phone,
                args.webSite,
                args.logo,
                args.bp,
                args.adress
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
    static async get(callback) {
        await Queries.getAll({
            table:`${etablishement}`,
            whereCloseFields:`${name}`,
            values:`?`,
            arguments:["sjdshksjh2323@@#@"]
        }).then((data) => {
            if (data.length > 0) {
                callback({
                    type: "success",
                    data,
                });
            } else {
                callback({
                    type: "success",
                    data: "Empty"
                });
            }
        })
        .catch((err) => {
            callback({
                type: "faillure",
                err,
            });
        });
    }
    static async update(args,callback){
        var { field, value, name } = args;
        switch (field) {
        case "Name":
            field = name;
            break;
        case "Phone":
            field = phone;
            break;
        case "Mail":
            field = mail;
            break;
        case "webSite":
            field = webSite;
            break;
        case "logo":
            field = logo;
            break;
        case "bp":
            field = bp;
            break;
        case "adress":
            field = adress;
            break;
        default:
            break;
        }
        Queries.updateData(
            {
                table: users,
                fields: `${field} = ?`,
                whereCloseFields: `${name} = ?`,
                arguments: [value, name]
            }
        ).then((data) => {
            callback({
                type: "success",                
            });
        }).catch((err) => {
            callback({
                type: "faillure",
                err,
            });
        });
    }
}
export default Etablishement