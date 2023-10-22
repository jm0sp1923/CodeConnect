import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"codeConect",

});

app.post("/create",(res,req)=>{
 
})

const puerto = 5500;
app.listen(puerto,()=>{
    console.log(`Server el en el puerto ${puerto}`)

})

 