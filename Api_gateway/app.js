const express = require("express")
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');

const routes = {
    '/api/v1/auth'          : "http://localhost:8000/api/v1/users",
    "/api/v1/conversations" : "http://localhost:8080/api/v1/conversations",
    
}

for(let route in routes){
    const targetRoute = routes[route]
    app.use(route, createProxyMiddleware({target:targetRoute,changeOrigin:true}))
}


app.all("*",(req,res)=>{
    res.status(404).json({message:"Invalid endpoint"})
})

app.listen(8085,()=>console.log("api gateway started on 8085 port"))