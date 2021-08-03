/**
 * File creating database tables and fields
 */

import colors from 'colors/safe.js'

import connecion from "./specials/connection.js"
connecion.connect()

export default class App {
    //this method shoud create your database
    static createDatabase(database) {
        return new Promise(create)

        function create(resolve, reject) {
            connecion.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err, result) => {
                if (err) App.throwError({ status: "error", message: ` Database [${database}] creation failed` })
                else {
                    resolve(App.use(database))
                    App.printSuccess({ status: "success", message: ` Database [${database}] created successfully` })
                }
            })
        }
    }
    //use the database means to select mysql database
    static use(database) {

        return new Promise((resolve, reject) => {
            if (App.checkValidity(database)) {
                connecion.query("USE " + database, (err, result) => {
                    if (err)
                        App.throwError({ status: "error", message: ` Database [${database}] selection failed, this maybe due to a wrong database name ! check the use() method` })
                    else {
                        App.printSuccess({ status: "success", message: `Database[${database}]selection successfully` })
                        resolve({
                            result,
                            App
                        })
                    }
                })
            } else {
                App.throwError({ status: "error", message: "use() method cannot take null, undefined or empty string as argument" })
            }

        })
    }

    static createTable(table, fields = {}) {
        return new Promise((resolve, reject) => {
            if(App.checkValidity(table)){

            }else App.throwError("createTable() method cannot take null, undefined or empty string as first argument")
        })
    }

    static throwError(error) {
        console.log(colors.red(error))
    }
    static printSuccess(success) {
        console.log(colors.cyan(success))
    }
    static checkValidity = (element) => element !== "" && element !== undefined && element !== null ? true : false
        
}