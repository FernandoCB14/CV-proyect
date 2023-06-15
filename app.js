const express = require('express');
const morgan=require('morgan');
const app = express();
const academic= require('./routes/Pacademic');
const profesional = require('./routes/Pprofesional');
const user = require("./routes/user");
const auth = require('./middlewares/auth');
const notfound= require("./middlewares/notFound");
const cors= require("./middlewares/cors");
require('dotenv').config();
const port= process.env.PORT;


app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req, res, next) =>{
    return res.status(200).send("Bienvenido al server")
});

app.use("/user", user)
app.use(auth);

app.use("/Pacademic", academic);
app.use("/Pprofesional", profesional);
app.use(notfound);


// app.listen(process.env.PORT || 8081,()=>{
//     console.log('Server is runing');
// });

app.listen(port, ()=>{
    console.log(`Server is runing at http://localhost:${port}`);
})


