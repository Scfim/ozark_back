import jwt from "jsonwebtoken";
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
  export default jwtVerify