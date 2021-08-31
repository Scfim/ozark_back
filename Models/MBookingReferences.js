import Queries from "../App/Queries.js";
import { databaseSchema, bookingsReferencesSchema } from "../App/Schema.js";
import { v4 as uuidv4 } from "uuid";
const{id,number,date,time,statusPayement,statOutput,userId,exerciseId} =bookingsReferencesSchema
const{references} = databaseSchema
export default class BookinReferences{
    static async insert(args,callback) {
        const referenceId = uuidv4();
        //verify if referenceId exist
        //=====================
        Queries.getSpecificFields({
            table: `${references}`,
            fields: `${id}`,
            whereCloseFields: `${id}=?;`,
            arguments: [referenceId],
          }).then((data)=>{
            if (data.length === 1 || data.length >= 1) {
                this.signUp(args, callback);
              } else {
                    Queries.addData({
                        table: `${references}`,
                        fields: `${id},${number},${date},${time},${statusPayement},${statOutput},${userId},${exerciseId}`,
                        values:`?,?,NOW(),NOW(),?,?,?,?`,
                        arguments:[
                            referenceId,
                            args.number,
                            0,
                            0,                           
                            args.userId,
                            args.exerciseId,                            
                            
                        ]
                    }).then((data) =>                                       
                        callback({
                        type: "success",
                        message:"Enregistrement effectué",
                        id:referenceId
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
    // COUNT REFERENCES EVENTS
static async getCount(callback) {
    await Queries.myQuery({
      query: `SELECT count(*) as count FROM ${references} where ${id}!=?`,
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
static async getRefrenceLike(args,callback) {
    await Queries.myQuery({
      query: `SELECT bookings.booking_id,bookings.date_record,bookings.booking_id,,products.product_id,products.product_name,bookings.quantity,bookings.unite_price,bookings.date_record,clients.client_name,bookings.client_id, bookings_references.booking_reference_id, bookings_references.booking_reference_number from bookings_references INNER JOIN bookings on bookings.booking_reference_id=bookings_references.booking_reference_id INNER JOIN products on products.product_id=bookings.product_id INNER JOIN clients on clients.client_id=bookings.client_id where bookings_references.booking_reference_number = ?`,
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
