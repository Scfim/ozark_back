import Queries from "../App/Queries.js";
import { databaseSchema, clientsSchema } from "../App/Schema.js";

import { v4 as uuidv4 } from "uuid";
const { id, name, adress, phone, mail, date, time, userId } = clientsSchema;
const { clients } = databaseSchema;
class Client {
  //INSERT client
  static async insert(args, callback) {
    const clientId = uuidv4();
    //verify if clientId exist
    //=====================
    Queries.getSpecificFields({
      table: `${clients}`,
      fields: `${id}`,
      whereCloseFields: `${id}=?`,
      arguments: [clientId],
    }).then((data) => {
      if (data.length === 1 || data.length >= 1) {
        this.signUp(args, callback);
      } else {
        Queries.addData({
          table: `${clients}`,
          fields: `${id},${name},${adress},${phone},${mail},${date},${time},${userId}`,
          values: `?,?,?,?,?,NOW(),NOW(),?`,
          arguments: [
            clientId,
            args.name,
            args.adress,
            args.phone,
            args.mail,
            args.userId,
          ],
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
    });
  }
  //GET client
  static async get(args, callback) {
    await Queries.getAll({
      table: `${clients}`,
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
  //GET clients
  static async getAll(callback) {
    await Queries.getAll({
      table: `${clients}`,
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
  static async delete(args, callback) {
    await Queries.removeData({
      table: `${clients}`,
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
          message:
            "Echec de suppression veillez vous rassurez que le client n'a de lié avec d'autres opération",
          err,
        });
      });
  }
  static async update(args, callback) {
    var { field, value, clientId } = args,
      callback;
    switch (field) {
      case "clientName":
        field = name;
        break;
      case "clientAdress":
        field = adress;
        break;
      case "clientPhone":
        field = phone;
        break;
      case "clientMail":
        field = mail;
        break;
      default:
        break;
    }

    await Queries.updateData({
      table: clients,
      fields: `${field} = ?`,
      whereCloseFields: `${id} = ?`,
      arguments: [value, clientId],
    })
      .then((data) =>
        callback({
          type: "success",
          data,
          message: "Modification effectuée",
        })
      )
      .catch((err) =>
        callback({
          type: "failure",
          err,
          message: "Echec dde modification",
        })
      );
  }
}
export default Client;
