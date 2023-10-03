const express=require('express');
const cors=require('cors');
const morgan=require('morgan');

const app=express();

var corsOptions={
    origin:'*',
}

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

//ejs
const path =require('path')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Imports rutas
const indexRoutes = require("./routes/index.routes.js")

app.use("/", indexRoutes)
app.use("/analizar", indexRoutes)
app.use("/TablaToken", indexRoutes)

  

//Default route
app.use((req,res,next)=>{
    res.status(404).json({
        message:'Not found'
});
})






module.exports=app;

