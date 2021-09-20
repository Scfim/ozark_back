import Queries from "../App/Queries.js";
import { databaseSchema, etablishementSchema } from "../App/Schema.js";
const { name, mail, phone, webSite, logo, bp, adress, date } =
  etablishementSchema;
const { etablishement } = databaseSchema;
class Etablishement {
  static async insert(args, callback) {
    Queries.addData({
      table: `${etablishement}`,
      fields: `${name},${mail},${phone},${webSite},${logo},${bp},${adress},${date}`,
      values: `?,?,?,?,?,?,?,NOW()`,
      arguments: [
        args.name,
        args.mail,
        args.phone,
        args.webSite,
        args.logo,
        args.bp,
        args.adress,
      ],
    })
      .then((data) =>
        callback({
          type: "success",
          message:"Enregistrement effectué"
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
  static async get(callback) {
    await Queries.getAllSecured({
      table: `${etablishement}`,
      securedField: `${name}`,
    })
      .then((data) => {
        callback({
          type: "success",
         data
        });
      })
      .catch((err) => {
        callback({
          type: "failure",
          err,
        });
      });
  }
  static async update(args, callback) {
    Queries.updateData({
      table: `${etablishement}`,
      fields: `${name} = ?,${phone}=?,${mail}=?,${webSite}=?,${logo}=?,${bp}=?,${adress}=?`,
      whereCloseFields: `${name} != ?`,
      arguments: [args.name,args.phone, args.mail, args.webSite,args.logo,args.bp,args.address,"hdhfdjfhd@#@#$%"],
    })
      .then(() => {
        callback({
          type: "success",
          message:"Modification effectuée"
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
export default Etablishement;
