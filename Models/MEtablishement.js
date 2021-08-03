import Queries from "../App/Queries.js";
import {databaseSchema,etablishementSchema} from "../App/Schema.js";
const {name,mail,phone,webSite,logo,bp,adress,date}=etablishementSchema
const {etablishement}=databaseSchema
class Etablishement{
    static async insert(args,callback){
        Queries.insertData({
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
        }).then((data) =>console.log("okok")
        ).catch((err) =>                              
            console.log("err")
        );
    }
}
export default Etablishement