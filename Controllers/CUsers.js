import express from "express";
import User from "../Models/MUsers.js";
const routes = express.Router();
import validator from "./Validator.js";
import jwt from "jsonwebtoken";
import sessionHandler from "../App/session.js";
// CREATE USER
routes.post("/add", sessionHandler, (request, response) => {
  const { name, lastName, email, phone, type, password, confirmPassword } =
    request.body;
  // if (request.session.user && request.session.user.data[0].user_type == "Admin") {
  if (validator(name).isString().check()) {
    if (validator(lastName).isString().check()) {
      if (validator(type).isString().check()) {
        if (validator(email).isEmailAddress().check()) {
          if (validator(phone).isPhoneNumber().check()) {
            if (validator(password).isString().check()) {
              if (
                validator(password).isString().loadValue() ===
                validator(confirmPassword).isString().loadValue()
              ) {
                User.signUp(
                  {
                    name: name,
                    lastName: lastName,
                    mail: email,
                    phone: phone,
                    password: password,
                    type: type,
                  },
                  (result) => {
                    response.send(result);
                  }
                );
              } else
                response.send({
                  type: "failure",
                  message: "Le mot de passe est invalide",
                });
            } else
              response.send({
                type: "failure",
                message: "Le mot de pass doit étre une chaine de caractère",
              });
          } else
            response.send({
              type: "failure",
              message: "Numéro de téléphone invalide",
            });
        } else
          response.send({
            type: "failure",
            message: "Adress mail invalide",
          });
      } else response.send({ type: "failure", message: "Type invalide" });
    } else response.send({ type: "failure", message: "Nom invalide" });
  } else
    response.send({
      type: "failure",
      message: "Le nom doit être du chaine de caractère",
    });
  // } else
  //   response.send({
  //     type: "failure",
  //     message: "Cette opération est reservé aux adminstrateur",
  //   });
});
routes.get("/getOne", sessionHandler, (request, response) => {
  const userId = request.body.userId;
  if (request.session.user) {
    User.get(
      {
        id: userId,
      },
      (result) => {
        response.send(result);
      }
    );
  } else
    response.send({
      type: "failure",
      message: "Cette opération necessite une connection",
    });
});
routes.get("/getAll", sessionHandler, (request, response) => {
  if (request.session.user) {
    User.getAll((result) => {
      response.send(result);
    });
  } else
    response.send({
      type: "failure",
      message: "Cette opération necessite une connection",
    });
});
// LOGIN USER
routes.post("/login", sessionHandler, (request, response) => {
    const { username, password } = request.body;
  
    var type = "";
    if (validator(username, password).isString().check() === true) {
      if (validator(password).isString().check() === true) {
        if (validator(username, password).isEmailAddress().check() === true) {
          type = "user_mail_adress";
          User.login({
            type: type,
            username: username,
            password: password,
          })
            .then((user) => {
              if (user.isAuthenticated) {
                request.session.user = user;
                delete request.session.user.data[0].user_pass_word;
                const id = user.data[0].user_id;
                const token = jwt.sign({ id }, "KSJDJDKI98489iriiIUIUTPWOEUE&EOpjosidsuifisoifupio(9878wbGIUSD*y4940ae0w0w98(E&W)(*WENjfhoisudfnIOIOUOIRsfuduue8438490438489eiureodUF*ALAAOPAPoiuspoi847030sdoisKJOIWEIdioss98sdiu834894304309ewufpfspiosfioufpisodfohIS5werOIEWPrlAPAIOI89e980posdjgkldw0KDJKLDLS:werktjw0943uwer908OuoiuWIUEiuiopsdupiofupsufpsudfpoisupeodiuoi*(90-84590jpuoidgisuoISOYPONPSOU&$)", {
                  expiresIn: "1d",
                });
                
                response.send({ auth: true, token, user: request.session.user });
              } else response.status(200).json(user);
            })
            .catch((err) => response.send(err));
        } else if (validator(username).isPhoneNumber().check() === true) {
          type = "user_phone_number";
          User.login({
            type: type,
            username: username,
            password: password,
          })
            .then((user) => {
              if (user.isAuthenticated) {
                request.session.user = user;
                delete request.session.user.data[0].user_pass_word;
                const id = user.data[0].user_id;
                const token = jwt.sign({ id }, "KSJDJDKI98489iriiIUIUTPWOEUE&EOpjosidsuifisoifupio(9878wbGIUSD*y4940ae0w0w98(E&W)(*WENjfhoisudfnIOIOUOIRsfuduue8438490438489eiureodUF*ALAAOPAPoiuspoi847030sdoisKJOIWEIdioss98sdiu834894304309ewufpfspiosfioufpisodfohIS5werOIEWPrlAPAIOI89e980posdjgkldw0KDJKLDLS:werktjw0943uwer908OuoiuWIUEiuiopsdupiofupsufpsudfpoisupeodiuoi*(90-84590jpuoidgisuoISOYPONPSOU&$)", {
                  expiresIn: "1d",
                }
              );
              response.send({ auth: true, token, user: request.session.user });
            } else response.status(200).json(user);
          })
          .catch((err) => response.send(err));
      } else
        response.send({ type: "failure", message: `Identifiants incorrect` });
    } else
      response.send({ type: "failure", message: `Identifiants incorrect` });
  } else response.send({ type: "failure", message: `Identifiants incorrect` });
});
routes.get("/login", sessionHandler, (request, response) => {
  console.log(request.session.user,request.session)
  if (request.session.user) {
    delete request.session.user.data[0].user_password;
    response.send({ authenticated: true, user: request.session.user });
  } else response.send({ authenticated: false });
});
const jwtVerify = (req, res, next) => {
  const token = req.headers["x-access-token"];
  var auth = false,
    message = "No token provided";
  if (token) {
    jwt.verify(
      token,
      "KSJDJDKI98489iriiIUIUTPWOEUE&EOpjosidsuifisoifupio(9878wbGIUSD*y4940ae0w0w98(E&W)(*WENjfhoisudfnIOIOUOIRsfuduue8438490438489eiureodUF*ALAAOPAPoiuspoi847030sdoisKJOIWEIdioss98sdiu834894304309ewufpfspiosfioufpisodfohIS5werOIEWPrlAPAIOI89e980posdjgkldw0KDJKLDLS:werktjw0943uwer908OuoiuWIUEiuiopsdupiofupsufpsudfpoisupeodiuoi*(90-84590jpuoidgisuoISOYPONPSOU&$)",
      (err, decode) => {
        if (err) res.send({ auth, message: "Authorisation failed" });
        else {
          req.userId = decode.id;
          next();
        }
      }
    );
  } else res.send({ auth, message });
};
routes.get("/auth", jwtVerify, (request, response, next) => {
  response.send({ auth: true });
});
routes.post("/update",sessionHandler, (request, response) => {
  const { field, value } = request.body;
  if(request.session.user){
    const userId=request.session.user.data[0].user_id
    if(validator(userId).isString().check()===true){
      if(validator(field).isString().check()===true){
        if(validator(value).isString().check()===true){
          if(field==="userMail" ){
            if(validator(value).isEmailAddress().check()===true){
              User.update({
                field: field,
                value: value,
                userId: userId
              },
              (result) => {
                response.send(result);
              })
            }else response.send({type: "failure", message: `Adress invalide`});
            
          }
          else if(field==="userPhone"){
            if( validator(value).isPhoneNumber().check()===true){
              User.update({
                field: field,
                value: value,
                userId: userId
              },
              (result) => {
                response.send(result);
              })
            }else response.send({type: "failure", message: `Le numéro est invalide`});
          }else{
            User.update({
              field: field,
              value: value,
              userId: userId
            },
            (result) => {
              response.send(result);
            })
          }
          
        }else response.send({type: "failure", message: `Aucune valeur n'a été donnée!`});
      }else response.send({type: "failure", message: `Veillez specifier l'élement a modifier !`});
    }else response.send({type: "failure", message: `Vous devez être connecté pour effectuer cette opération !`});
  }else response.send({ type: "failure",message:"Vous devez être connecté pour effectuer cette opération" });
});
routes.post("/updatePassword", sessionHandler, (request, response) => {
  const { password, oldePassword } = request.body;
  if(request.session.user){
    const userId=request.session.user.data[0].user_id
    var oldePasswordFromDb;
    const pwd = crypto.createHash("sha256").update(oldePassword).digest("hex");
    if (validator(password).isString().check === true) {
      if (pwd === oldePasswordFromDb) {
        User.updatePassword(
          {
            password: password,
            userId: userId,
          },
          (result) => {
            response.send(result);
           
          }
        );
      } else response.json({type:"failure", message: `Mot de passe invalide` });
    } else response.json({ type:"failure", message: `Mot de passe invalide` });
}else response.send({ type: "failure",message:"Vous devez être connecté pour effectuer cette opération" });
});
export default routes;
