//importing middlewares
import mysql from "mysql"
/**
 * @var {Props} database2 : Our database
 * @var {Props} user : Username Connection
 * @var {Props} password : Password Connection
 * @var {Props} host : server
 */
//Defining database constants
const database2 = "ozark"
const user = "root"
const password = ""
const host = "localhost"


//connection to the database
const database = mysql.createConnection({
   database:database2,
   user,
   password,
   host
})

export default database