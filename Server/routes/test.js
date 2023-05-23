const express = require('express');
const router = express.Router();

//import controllers
const {getTest} = require('../controllers/test');
//import middlewares

//api routers
router.GET('/test',getTest);


module.exports = router;
