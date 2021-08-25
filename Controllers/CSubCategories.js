import express from "express";
import SubCategories from "../Models/MSubCategories.js";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js";
routes.post("/add", sessionHandler, (request, response) => {
  const { categorieId, name, type } = request.body;
  if (request.session.user) {
    const userId = request.session.user.data[0].user_id;
    if (validator(name).isString().check()) {
      if (validator(type).isString().check) {
        if (validator(categorieId).isString().check) {
          SubCategories.insert(
            {
              categorieId: categorieId,
              name: name,
              type: type,
              userId: userId,
            },
            (result) => {
              response.send(result);
            }
          );
        } else
          response.send({
            type: "failure",
            message: "la categorie dit être du type chaine de caractaire",
          });
      } else
        response.send({
          type: "le type doit être du type chaine des caractaire",
        });
    } else
      response.send({
        type: "failure",
        message: "Le nom doit être du type chaine des caractaire",
      });
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour effectuer cette opération",
    });
});
routes.post("/getOne", sessionHandler, (request, response) => {
  const subCategorieId = request.body.subCategorieId;
  if (request.session.user) {
    SubCategories.get(
      {
        id: subCategorieId,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/delete", sessionHandler, (request, response) => {
  const subCategorieId = request.body.subCategorieId;
  if (request.session.user) {
    SubCategories.delete(
      {
        id: subCategorieId,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getCategories", sessionHandler, (request, response) => {
  const categorieName = request.body.categorieName;
  if (request.session.user) {
    SubCategories.getCategories(
      {
        name: categorieName,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getAll", sessionHandler, (request, response) => {
  if (request.session.user) {
    SubCategories.getAll((result) => response.send(result));
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/update",sessionHandler, (request, response)=>{
  const {categorieId,subBategoryId,subCategoryName}=request.body
   if(request.session.user){
    SubCategories.update({
          categorieId:categorieId,
          id: subBategoryId,
          name: subCategoryName,
       },(result)=>response.send(result))
   }else response.send({ type:"failure", message: "Vous devez être connecté pour éffectuer cette opération" });
   
})
export default routes;
