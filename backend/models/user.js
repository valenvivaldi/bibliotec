"use strict";
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");


var Schema = mongoose.Schema;

var UserSchema = Schema(
  {
    dni: {
      type: Number
    },

    password: {
      type: String,
      required: true,
    },

    readed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    pendient: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    role: Number,

    active: Boolean, //
  },
  { timestamps: true }
);


//middleware del modelo
UserSchema.pre("save", function () {
  console.log('ejecuto presave');
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model("User", UserSchema);
