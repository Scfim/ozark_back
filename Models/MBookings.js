import Queries from"../App/Queries.js"
import{databaseSchema,bookingsSchema} from"../App/Schema.js"
import { v4 as uuidv4 } from "uuid";
const{id,productId,clientId,quantity,unitePrice,number,description,exerciseId,dateRecord,timeRecord,date,time,userId} =bookingsSchema;
const {bookings}=databaseSchema;
export default class booking{
        //INSERT booking
static async insert(args,callback) {
    const bookingId = uuidv4();
    //verify if bookingId exist
    //=====================
    Queries.getSpecificFields({
        table: `${bookings}`,
        fields: `${id}`,
        whereCloseFields: `${id}=?;`,
        arguments: [bookingId],
      }).then((data)=>{
        if (data.length === 1 || data.length >= 1) {
            this.signUp(args, callback);
          } else {
                Queries.addData({
                    table: `${bookings}`,
                    fields: `${id},${productId},${clientId},${quantity},${unitePrice},${number},${description},${exerciseId},${dateRecord},${timeRecord},${date},${time},${userId};`,
                    values:`?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),?`,
                    arguments:[
                        bookingId,
                        args.productId,
                        args.clientId,
                        args.quantity,
                        args.unitePrice,
                        args.number,
                        args.description,
                        args.exerciseId,
                        args.dateRecord,
                        args.timeRecord,
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
    table: `${bookings}`,
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
//GET bookings
static async getAll(callback) {
    await Queries.getAll({
      table: `${bookings}`,
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
// COUNT BOOKING EVENTS
static async getCount(callback) {
  await Queries.myQuery({
    query: `SELECT count(*) as count FROM bookings where ${id}!=?`,
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

}