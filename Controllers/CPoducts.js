import express from "express";
import Products from "../Models/MProducts.js";
const routes = express.Router();
import validator from "./Validator.js";
import sessionHandler from "../App/session.js"
import jwtVerify from "../App/VerifyToken.js";
routes.post("/add", [sessionHandler,jwtVerify], (request, response) => {
  const { subCategorieId, name, dosage, forme, format, alertStock, markId } =
    request.body;
  if (request.session.user) {
    const userId = request.session.user.data[0].user_id;
    if (validator(name).isString().check()) {
      if (validator(subCategorieId).isString().check) {
        Products.insert(
          {
            markId: markId,
            name: name,
            dosage: dosage,
            forme: forme,
            format: format,
            alertStock: alertStock,
          },
          (result) => {
            response.send(result);
          }
        );
      } else
        response.send({
          type: "failure",
          message: "le sous categorie doit etre du type chaine de caractaire",
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
routes.post("/getOne", [sessionHandler,jwtVerify], (request, response) => {
  const productId = request.body.productId;
  if (request.session.user) {
    Products.get(
      {
        id: productId,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getProductLike", [sessionHandler,jwtVerify], (request, response) => {
  const productName = request.body.productName;
  if (request.session.user) {
    Products.getProductLike(
      {
        name: productName,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/delete", [sessionHandler,jwtVerify], (request, response) => {
  const productId = request.body.productId;
  if (request.session.user) {
    Products.delete(
      {
        id: productId,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getSubCateries", [sessionHandler,jwtVerify], (request, response) => {
  const subCategorieName = request.body.subCategorieName;
  if (request.session.user) {
    Products.getSubCategories(
      {
        name: subCategorieName,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getMarks", [sessionHandler,jwtVerify], (request, response) => {
  const markName = request.body.markName;
  if (request.session.user) {
    Products.getMark(
      {
        name: markName,
      },
      (result) => response.send(result)
    );
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/getAll", [sessionHandler,jwtVerify], (request, response) => {
  if (request.session.user) {
    Products.getAll((result) => response.send(result));
  } else
    response.send({
      type: "failure",
      message: "Vous devez être connecté pour éffectuer cette opération",
    });
});
routes.post("/update", [sessionHandler,jwtVerify], (request, response)=>{
  const {productId,markId,productName}=request.body
   if(request.session.user){
      Marks.update({
        markId:markId,
          id: productId,
          name: productName,
       },(result)=>response.send(result))
   }else response.send({ type:"failure", message: "Vous devez être connecté pour éffectuer cette opération" });
   
})
export default routes;
