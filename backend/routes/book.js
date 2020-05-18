'use strict'
var express = require('express');
var BookController = require('../controllers/book');

//importamos libreria de connect-multiparty
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './files'});


//creamos un router
var router = express.Router();
router.get('/test',BookController.test);

router.get('/',BookController.all);
router.get("/search/:searchTerm", BookController.search);


router.post('/importFromExcel',md_upload,BookController.importFromExcel); 

module.exports=router;