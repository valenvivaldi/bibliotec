'use strict'
var express = require('express');
var BookController = require('../controllers/book');

//creamos un router
var router = express.Router();

router.get('/all',BookController.all);

router.get('/test',BookController.test);
router.post('/importFromExcel',BookController.importFromExcel); 

module.exports=router;