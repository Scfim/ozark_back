import Queries from "../App/Queries.js";
import { databaseSchema, outputSchema } from "../App/schema.js";
import { v4 as uuidv4 } from "uuid";
const {
  id,
  bookingId,
  reference,
  outputNumber,
  quantity,
  unitePrice,
  exerciseId,
  dateRecord,  
  date,
  time,
  envoy,
  userId,
  productId
} = outputSchema;
const { output } = databaseSchema;
export default class Ouptut {
  static async insert(args, callback) {
    const outputId = uuidv4();
    //verify if outputId exist
    //=====================
    Queries.getSpecificFields({
      table: `${output}`,
      fields: `${id}`,
      whereCloseFields: `${id}=?`,
      arguments: [outputId],
    }).then((data) => {
      if (data.length === 1 || data.length >= 1) {
        this.signUp(args, callback);
      } else {
        Queries.addData({
          table: `${output}`,
          fields: `${id},${bookingId},${productId},${reference},${quantity},${unitePrice},
                        ${exerciseId},${dateRecord},${envoy},${date},${time},${userId}`,
                        values:`?,?,?,?,?,?,?,?,?,NOW(),NOW(),?`,
                        arguments:[
                            outputId,
                            args.bookingId,
                            args.productId,
                            args.referenceId,
                            args.quantity,
                            args.unitePrice,                           
                            args.exerciseId,
                            args.dateRecord,
                            args.envoy,
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
    //GET booking
    static async get(args, callback) {
        await Queries.getAll({
        table: `${output}`,
        whereCloseFields: `${number}=?`,
        arguments: [args.number],
        })
          .then((data) =>
            callback({
              type: "success",
            })
          )
          .catch((err) =>
            callback({
              type: "failure",
              message: "Echec d'enregistrement",
              err,
            })
          );
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
  static async getStatementOfOutput(args,callback) {
    await Queries.myQuery({
      query: `SELECT bookings.date_record,products.product_name,bookings.quantity,bookings.unite_price,output_traffic.quantity as qteOut,
      output_traffic.date_record, bookings_references.booking_reference_number
      FROM output_traffic inner join bookings on bookings.booking_id=output_traffic.booking_id 
      inner join products on products.product_id=bookings.product_id inner join bookings_references on bookings_references.booking_reference_id=output_traffic.booking_reference_id where bookings_references.booking_reference_number=?`,
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
