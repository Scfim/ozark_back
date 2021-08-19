import Queries from"../App/Queries.js"
import{databaseSchema,outputSchema} from "../App/schema.js"
import { v4 as uuidv4 } from "uuid";
const{id,bookingId,reference,outputNumber,quantity,unitePrice,exerciseId,dateRecord,timeRecord,date,time,perisable,envoy,userId}=outputSchema;
const {output}=databaseSchema;
export default class Ouptut{
   
    static async insert(args,callback) {
        const outputId = uuidv4();
        //verify if outputId exist
        //=====================
        Queries.getSpecificFields({
            table: `${output}`,
            fields: `${id}`,
            whereCloseFields: `${id}=?`,
            arguments: [outputId],
          }).then((data)=>{
            if (data.length === 1 || data.length >= 1) {
                this.signUp(args, callback);
              } else {
                    Queries.addData({
                        table: `${output}`,
                        fields: `${id},${bookingId},${reference},${outputNumber},${quantity},${unitePrice},
                        ${exerciseId},${dateRecord},${timeRecord},${perisable},${envoy},${date},${time},${userId};`,
                        values:`?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),?`,
                        arguments:[
                            outputId,
                            args.bookingId,
                            args.reference,
                            args.outputNumber,
                            args.quantity,
                            argsa.unitePrice,                           
                            args.exerciseId,
                            args.dateRecord,
                            args.timeRecord,
                            args.perisable,
                            args.envoy,
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
    //GET booking
    static async get(args, callback) {
        await Queries.getAll({
        table: `${output}`,
        whereCloseFields: `${number}=?`,
        arguments: [args.number],
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