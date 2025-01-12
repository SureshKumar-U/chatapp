const cors = require('cors');
  const corsConfiguration = ()=>{

    return cors({
        //origin --> it tells  that from which origins us ers can access your api
        origin :(origin,callback)=>{
      
            const allowedOrigins = ["http://localhost:3000", "http://192.168.58.17:3000", "http://localhost:5173"]
        if(!origin || allowedOrigins.indexOf(origin) != -1){
            callback(null,true) // give permission to user, so that user request allowed
        }else{
            callback(new Error("Not allowed by cors"))
        }

        },
        methods :["POST", "GET", "PUT", "DELETE"],
        allowedHeaders :[
            "Content-Type",
            "Authorization",
            "Accept-version"
        ], 
        exposedHeaders :['X-Total-Count', "Content-Range"],
        credentials : true, // enable cookie support
        preflightContinue : false,
        maxAge: 600 // cache the preflight response for 10 mins(600 seconds).
    })
}
module.exports = corsConfiguration