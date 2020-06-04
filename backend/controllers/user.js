"use strict";

var validator = require("validator");
var User = require("../models/user");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

var controller = {
  register: (req, res) => {
    console.log(req.body);
    var newdni = req.body.dni;
    var newpassword = "" + req.body.password;
    var newpassword2 = "" + req.body.password2;

    if (
      newdni &&
      newpassword &&
      newpassword2 &&
      !validator.isEmpty(newdni) &&
      !validator.isEmpty(newpassword) &&
      !validator.isEmpty(newpassword2) &&
      validator.isNumeric(newdni) &&
      newpassword == newpassword2
    ) {
      console.log("valido todo");
      User.findOne({ dni: newdni }).then((user) => {
        if (user) {
          res.status(200).send({
            status: "error",
            message: "El dni ya esta registrado. inicie sesion!",
          });
        } else {
          var newUser = new User({ dni: newdni, password: newpassword });
          newUser.save().then((user) => {
            res.status(200).send({
              status: "success",
              message: "se ha registrado la cuenta con exito.",
            });
          });
        }
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "los datos enviados no son validos",
      });
    }
  },
  login: (req, res) => {
    console.log(req.body);
    if (
      req.body.dni &&
      req.body.password &&
      validator.isNumeric(req.body.dni)
    ) {
      var dni = req.body.dni;
      var pass = req.body.password;
      User.findOne({ dni }).then((user) => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ message: "Email not found" });
        }
        // Check password
        bcrypt.compare(pass, user.password).then((isMatch) => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
            };
            // Sign token
            jwt.sign(
              payload,
              //keys.secretOrKey,
              'secret',
              {
                expiresIn: '2h', // 2housrs
              },
              (err, token) => {
                res.status(200).json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          }
        });
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "los datos enviados no son validos",
      });
    }

   // res.status(200).send("test login");
  },
};

module.exports = controller;
