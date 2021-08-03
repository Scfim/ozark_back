import  MyConnection from "./Config.js"


/**
 * @Queries Class that manages every single query in this application
 */
class Queries {

    /**
     * @method AddData makes every single inserting query
     * @param  params  user data parameters provider
     * @return Promise
     */
    static async addData(params){        
        return new Promise((resolve, reject)=>{
            MyConnection.query(`INSERT INTO ${params.table}(${params.fields}) VALUES(${params.values});`,params.arguments,(err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })                   
    }
    /**
     * @method updateData makes every single inserting query
     * @param  params  user data parameters provider
     * @return Promise
     */
    static async updateData  (params){        
        return new Promise((resolve, reject)=>{
            MyConnection.query(`UPDATE ${params.table} SET ${params.fields} WHERE ${params.whereCloseFields};`,params.arguments,(err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })              
    }

    static async removeData(params){        
        return new Promise((resolve, reject)=>{
                MyConnection.query(`DELETE FROM ${params.table} WHERE ${params.whereCloseFields}`,params.arguments, (err, result)=>{
                    if(!err) resolve(result)
                    else reject(err)
                })
        })             
    }

   static async getAll(params){        
        return new Promise((resolve, reject)=>{
            MyConnection.query(`SELECT * FROM ${params.table} WHERE ${params.whereCloseFields};`,params.arguments, (err, result)=>{
            !err?resolve(result):reject(err)
            })
        })
              
    }
    static async getAllSecured(params){        
        return new Promise((resolve, reject)=>{
            database.query(`SELECT * FROM ${params.table} WHERE ${params.securedField}!=?;`,['scfim2021@gmail.com'], (err, result)=>{
            !err?resolve(result):reject(err)
            })
        })               
    }
    static async getSpecificFields(params){        
        return new Promise((resolve, reject)=>{
                database.query(`SELECT ${params.fields} FROM ${params.table} WHERE ${params.whereCloseFields};`,params.arguments, (err, result)=>{
                !err?resolve(result):reject(err)
                })
        })               
    }
    static async getSpecificFieldsBetween(params){        
        return new Promise((resolve, reject)=>{
            database.query(`SELECT ${params.fields} FROM  ${params.table} WHERE ${params.whereCloseFields} BETWEEN ${params.startDate} AND ${params.endDate}`,params.arguments,(err,result)=>{
            !err?resolve(result):reject(err)
            })
        })
                    
        
    }

   static async getAllBetween(params){      
        return new Promise((resolve, reject)=>{
            database.query(`SELECT * FROM ${params.table} WHERE ${params.whereCloseFields} BETWEEN ${params.startDate} AND ${params.endDate};`,params.arguments, (err, result)=>{
            !err?resolve(result):reject(err)
            })
        })
                      
    }
   static async myQuery(params){
       
    database.connect().then(function(con){
        console.log('connected!');
       console.log(con)
      
         
         con.on('error', function (err, result) {
             console.log('error occurred. Reconneting...');
            // mysqlAPI.reconnect();
         });
         con.query(`${params.query}`,params.arguments, (err, result)=>{
            if (err) {
                console.log("Errore login: " + err);
            }
            else {
                //check to see if the result is empty
                if(result.length > 0){
                    return result
                   
               }
            }
            })
     });      
                             
    }
    static async insertData(params){  
        MyConnection.connect().then(function(con){
            console.log('connected!');                   
             
             con.on('error', function (err, result) {
                 console.log('error occurred. Reconneting...');
                // mysqlAPI.reconnect();
             });
             return new Promise((resolve, reject)=>{
                con.query(`INSERT INTO ${params.table}(${params.fields}) VALUES(${params.values});`,params.arguments,(err, result)=>{
                    if(!err){
                        console.log("ok", result)
                        resolve(result)
                    }else{
                        console.log("Errore",err)
                        reject(err)
                    }
                })
            })
         })                  
    }
    
}

export default Queries 