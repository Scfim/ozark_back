import session from "express-session" 

var sessionMiddleware = session({
    key:"NODE_SESSION",
    secret:"gs9u432503jrlwerktjw0943uwertjwoe8734yhSJD:LFKLerltjwlelkhernw84y30274yoteSDFryt873y4tweoirt0u3948ythureuwy38475623932$74yurhew9rt8w3487wé2x@ui3y45ywueirjhfwierfhw$%fw87ry93h74$@@urtfwuejrk*jhkhfHJSKJ%WE&^GBkjofas8T(&EW(*&FJLKJNVShrur87yh900*foweiurfjhwe89r439y7ruweUEOEH908-0eoE&EHDOS)EW*&WESIUD7687iughjhryfkH&647akGlakjsdf89we8IUDFUYOWY&E)*JKHSDOUISJKSFPIOUFjkshodfiuaksdf87oweuijakGIV&WYUTHFbkwejhapijbkhBO*&YYE*&YUE*EUIDOKDYOFIDJNAUIFJB)UB)UGT*UF*ALAAOPAPAIOI89ew0KDJKLDLS:S:9798rq8wenenndsfkaspdfioanSFpf8HDSFIB)(BF_9bSid93",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:182 * 24 * 60 * 60 * 1000}
  });

export default function sessionHandler(req, res, next) { 
    sessionMiddleware(req, res, next) 
}
