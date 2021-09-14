import database from "./Config.js";

/**
 * @Queries Class that manages every single query in this application
 */
class Queries {
  /**
   * @method AddData makes every single inserting query
   * @param  params  user data parameters provider
   * @return Promise
   */
  static async addData(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          connection.query(
            `INSERT INTO ${params.table}(${params.fields}) VALUES(${params.values});`,
            params.arguments,
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(err);
              }
            }
          );
          connection.release();
        }
      });
    });
  }
  /**
   * @method updateData makes every single inserting query
   * @param  params  user data parameters provider
   * @return Promise
   */
  static async updateData(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          connection.query(
            `UPDATE ${params.table} SET ${params.fields} WHERE ${params.whereCloseFields};`,
            params.arguments,
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(err);
              }
            }
          );
          connection.release();
        }
      });
    });
  }

  static async removeData(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          connection.query(
            `DELETE FROM ${params.table} WHERE ${params.whereCloseFields}`,
            params.arguments,
            (err, result) => {
              if (!err) resolve(result);
              else reject(err);
            }
          );
          connection.release();
        }
      });
    });
  }

  static async getAll(params) {
    return new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM ${params.table} WHERE ${params.whereCloseFields};`,
        params.arguments,
        (err, result) => {
          !err ? resolve(result) : reject(err);
        }
      );
    });
  }
  static async getAllSecured(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          database.query(
            `SELECT * FROM ${params.table} WHERE ${params.securedField}!=?;`,
            ["scfim2021@gmail.com"],
            (err, result) => {
              !err ? resolve(result) : reject(err);
            }
          );
          connection.release();
        }
      });
    });
  }
  static async getSpecificFields(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          connection.query(
            `SELECT ${params.fields} FROM ${params.table} WHERE ${params.whereCloseFields};`,
            params.arguments,
            (err, result) => {
              !err ? resolve(result) : reject(err);
            }
          );
          connection.release();
        }
      });
    });
  }
  static async getSpecificFieldsBetween(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          connection.query(
            `SELECT ${params.fields} FROM  ${params.table} WHERE ${params.whereCloseFields} BETWEEN ${params.startDate} AND ${params.endDate}`,
            params.arguments,
            (err, result) => {
              !err ? resolve(result) : reject(err);
            }
          );
          connection.release();
        }
      });
    });
  }

  static async getAllBetween(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          connection.query(
            `SELECT * FROM ${params.table} WHERE ${params.whereCloseFields} BETWEEN ${params.startDate} AND ${params.endDate};`,
            params.arguments,
            (err, result) => {
              !err ? resolve(result) : reject(err);
            }
          );
          connection.release();
        }
      });
    });
  }
  static async myQuery(params) {
    return new Promise((resolve, reject) => {
      database.getConnection((err, connection) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          connection.query(
            `${params.query}`,
            params.arguments,
            (err, result) => {
              !err ? resolve(result) : reject(err);
            }
          );
          connection.release();
        }
      });
    });
  }
}

export default Queries;
