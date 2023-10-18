const express = require('express');
const router = express.Router();

//Imports controller
const indexController = require('../controller/index.controller.js')


// Rutas
router.get("/", indexController.index);
router.post("/analizar", indexController.analizar);
router.get("/TablaToken", indexController.TablaToken);
router.get("/TablaErrores", indexController.TablaErrores);
router.get("/GenerarAST", indexController.GenerarAST);


module.exports=router;