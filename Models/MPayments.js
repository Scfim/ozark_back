import Queries from "../App/Queries.js";
import { databaseSchema, payementsSchema } from "../App/schema.js";
import { v4 as uuidv4 } from "uuid";
const { payement } = databaseSchema;
const {
  id,
  referenceId,
  dateRecord,
  timeRecord,
  mount,
  envoy,
  exerciseId,
  userId,
  date,
  time,
} = payementsSchema;
export default class Payments {
  static async insert(args, callback) {
    const paymentId = uuidv4();
    //verify if paymentId exist
    //=====================
    Queries.getSpecificFields({
        table: `${payement}`,
        fields: `${id}`,
        whereCloseFields: `${id}=?`,
        arguments: [paymentId],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            this.signUp(args, callback);
          } else {
                Queries.addData({
                    table: `${payement}`,
                    fields: `${id},${referenceId},${dateRecord},${timeRecord},${mount},${envoy},${exerciseId},${date},${time},${userId}`,
                    values:`?,?,?,?,?,?,?,NOW(),NOW(),?`,
                    arguments:[
                        paymentId,
                        args.referenceId,
                        args.dateRecord,
                        args.timeRecord,
                        args.mount,
                        args.envoy,
                        args.exerciseId,
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
}
