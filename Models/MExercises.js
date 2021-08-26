import Queries from "../App/Queries.js";
import { databaseSchema, exercisesSchema } from "../App/Schema.js";

import { v4 as uuidv4 } from "uuid";
const { id, startDate, endDate, status, date, time, userId } = exercisesSchema;
const { exercises } = databaseSchema;
class Exercise {
  //INSERT exercise
  static async insert(args, callback) {
    const exerciseId = uuidv4();
    //verify if exerciseId exist
    //=====================
    Queries.getSpecificFields({
      table: `${exercises}`,
      fields: `${id}`,
      whereCloseFields: `${id}=?`,
      arguments: [exerciseId],
    }).then((data) => {
      if (data.length === 1 || data.length >= 1) {
        this.signUp(args, callback);
      } else {
        Queries.addData({
          table: `${exercises}`,
          fields: `${id},${startDate},${endDate},${status},${date},${time},${userId}`,
          values: `?,?,?,?,NOW(),NOW(),?`,
          arguments: [exerciseId, args.startDate, args.endDate, 1, args.userId],
        })
          .then((data) => {
            if (data.affectedRows === 1 && data.serverStatus === 2) {
              Queries.updateData({
                table: `${exercises}`,
                fields: `${status}=?`,
                whereCloseFields: `${id}!=?`,
                arguments: [0, exerciseId],
              })
                .then(() =>
                  callback({
                    type: "success",
                    message: "Exercice enregisrtré et activé !",
                  })
                )
                .catch((err) => {
                  callback({
                    type: "failure",
                    message: "Echec d'activation de l'exercice",
                    err,
                  });
                });
            }
          })
          .catch((err) =>
            callback({
              type: "failure",
              message: "Echec d'enregistrement",
              err,
            })
          );
      }
    });
  }
  //GET exercise
  static async get(args, callback) {
    await Queries.getAll({
      table: `${exercises}`,
      whereCloseFields: `${id}=? and${status}=?`,
      arguments: [args.id, 1],
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
static async getCurrent(callback) {
    await Queries.getAll({
      table: `${exercises}`,
      whereCloseFields: `${status}=?`,
      arguments: [1],
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
  //GET exercises
  static async getAll(callback) {
    await Queries.getAll({
      table: `${exercises}`,
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
}
export default Exercise;
