const express = require('express');
const morgan=require('morgan');
const app = express();
const usuarios= require('./routes/usuarios');
const user = require("./routes/user");
const auth = require('./middlewares/auth');
const notfound= require("./middlewares/notFound");
const cors= require("./middlewares/cors");

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req, res, next) =>{
    return res.status(200).send("Bienvenido al servidor")
});

app.use(cors);

app.use("/user", user)
app.use(auth);
app.use("/usuarios", usuarios);
app.use(notfound);

app.listen(process.env.PORT || 8081,()=>{
    console.log('Server is runing');
});


