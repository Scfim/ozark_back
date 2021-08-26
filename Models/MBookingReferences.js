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
                        fields: `${id},${number},${date},${time},${statusPayement},${statOutput},${userId},${exerciseId};`,
                        values:`?,?,?,?,?,?,?,?`,
                        arguments:[
                            referenceId,
                            args.number,
                            0,
                            0,
                            args.date,
                            args.time,
                            args.exerciseId,                            
                            args.userId
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
}
