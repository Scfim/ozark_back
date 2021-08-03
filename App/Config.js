//importing middlewares
import mysql from "mysql"
import Q from "q"


var Myconnection={}
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

Myconnection.connect = function(){
   var d = Q.defer();
   Myconnection.connection = mysql.createConnection({
       host,
       user,                
       password,           
       database : database2
   });

   Myconnection.connection.connect(function (err) {
       if(err) {
          
           d.reject();
       } else {
          
           d.resolve(Myconnection.connection);
       }
   });
   return d.promise;
};
export default Myconnection