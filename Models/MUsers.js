import Queries from "../App/Queries.js";
import { databaseSchema, usersSchema } from "../App/Schema.js";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const {
  id,
  name,
  lastName,
  phone,
  mail,
  type,
  password,
  userImage,
  date,
  time,
} = usersSchema;
const { users } = databaseSchema;
class User {
  static async signUp(args, callback) {
    const pwd = crypto.createHash("sha256").update(args.password).digest("hex");
    const userId = uuidv4();
    //verify if userId exist
    //=====================
    Queries.getSpecificFields({
      table: `${users}`,
      fields: `${id}`,
      whereCloseFields: `${id}=?`,
      arguments: [userId],
    })
      .then((data) => {
        if (data.length === 1 || data.length >= 1) {
          this.signUp(args, callback);
        } else {
          // verify mail address if exist
          //=============================
          Queries.getSpecificFields({
            table: `${users}`,
            fields: `${mail}`,
            whereCloseFields: `${mail}=?`,
            arguments: [args.mail],
          }).then((data) => {
            if (data.length === 1 || data.length >= 1) {
              callback({
                type: "Failure",
                isAuthenticated: false,
                message: "Cette adresse mail existe déjà",
              });
            } else {
              // verify phone number
              //====================
              //const number=`%${args.phone.slice(-9)}%`
              Queries.getSpecificFields({
                table: `${users}`,
                fields: `${phone}`,
                whereCloseFields: `${phone} = ?`,
                arguments: [args.phone],
              }).then((data) => {
                if (data.length === 1 || data.length >= 1) {
                  callback({
                    type: "failure",
                    isAuthenticated: false,
                    message: "Ce numéro existe déjà",
                  });
                } else {
                  //insert user
                  //===============
                  const pwd = crypto
                    .createHash("sha256")
                    .update(args.password)
                    .digest("hex");
                  Queries.addData({
                    table: users,
                    fields: `${id},${name},${lastName},${phone},${mail},${type},${password},${date},${time}`,
                    values: "?,?,?,?,?,?,?, NOW(), NOW()",
                    arguments: [
                      userId,
                      args.name,
                      args.lastName,
                      args.phone,
                      args.mail,
                      args.type,
                      pwd,
                    ],
                  })
                    .then((data) =>
                      callback({
                        type: "success",
                        data,
                        message: "Inscription effectuée",
                      })
                    )
                    .catch((err) =>
                      callback({
                        type: "failure",
                        err,
                        message: "Echec d'inscription",
                      })
                    );
                }
              });
            }
          });
        }
      })
      .catch((err) => {
        callback({
          type: "failure",
          err,
        });
      });
  }
  //GET USER
  static async get(args, callback) {
    await Queries.getAll({
      table: `${users}`,
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
  //GET USER
  static async getAll(callback) {
    await Queries.getAll({
      table: `${users}`,
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
  //USER LOGIN
  static async login(userInfos) {
    let { username, password, type } = userInfos;
    const pwd = crypto.createHash("sha256").update(password).digest("hex");
    const compare = (passwordForm, passwordDatabase, callback) => {
      if (passwordForm === passwordDatabase) {
        callback({
          type: "success",
        });
      } else
        callback({ type: "failure", message: "Erreur d'authentification" });
    };

    return new Promise((resolve, reject) => {
      Queries.getAll({
        table: `${users}`,
        whereCloseFields: ` ${type}=? `,
        arguments: [username],
      })
        .then((data) => {
          if (data.length === 1 || data.length >= 1) {
            compare(pwd, data[0].user_pass_word, (response) => {
              response.type === "success"
                ? resolve({
                    type: "success",
                    isAuthenticated: true,
                    data,
                  })
                : reject({
                    type: "failure",
                    isAuthenticated: false,
                    message: "Erreur d'authentification",
                  });
            });
          } else {
            reject({
              type: "failure",
              isAuthenticated: false,
              message: "Identifiant incorrect",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  //UPDATE ALL INFORMATION
  static async update(args, callback) {
    var { field, value, userId } = args,
      callback;
    switch (field) {
      case "userFirstName":
        field = name;
        break;
      case "userLastName":
        field = lastName;
        break;
      case "userPhone":
        field = phoneNumber;
        break;
      case "userMail":
        field = mail;
        break;
      default:
        break;
    }
    if (field === phoneNumber || field === mail) {
      var val = value;
      if (field === phoneNumber) {
        val = `%${value.slice(-9)}%`;
      } else val = value;

      Queries.getAll({
        table: `${users}`,
        whereCloseFields: `${field} LIKE?`,
        arguments: [val],
      }).then((data) => {
        if (data.length > 0) {
          if (field === phoneNumber) {
            callback({
              type: "failure",
              message: "Le numéro existe déjà",
            });
          } else {
            callback({
              type: "failure",
              message: "cette adress existe déjà",
            });
          }
        } else {
          Queries.updateData({
            table: users,
            fields: `${field} = ?`,
            whereCloseFields: `${id} = ?`,
            arguments: [value, userId],
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
                message: "Echec de modification",
              })
            );
        }
      });
    } else {
      await Queries.updateData({
        table: users,
        fields: `${field} = ?`,
        whereCloseFields: `${id} = ?`,
        arguments: [value, userId],
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
  // update password
  static async updatePassword(args, callback) {
    const pwd = crypto.createHash("sha256").update(args.password).digest("hex");
    await Queries.updateData({
      table: `${users}`,
      fields: `${password} = ?`,
      whereCloseFields: `${id} = ?`,
      arguments: [pwd, args.userId],
    })
      .then((data) =>
        callback({
          type: "success",
          data,
          message: "Inscription effectuée",
        })
      )
      .catch((err) =>
        callback({
          type: "failure",
          message: "Echec de modification",
          err,
        })
      );
  }
}
export default User;
