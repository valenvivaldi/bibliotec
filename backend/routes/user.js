"use strict";
var express = require("express");
var UserController = require("../controllers/user");

//creamos un router
var router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/getReaded", UserController.getReaded);
module.exports = router;