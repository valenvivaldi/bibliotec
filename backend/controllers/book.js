'use strict'


var controller = {
    all: (req, res) => {
        return res.status(200).send({})
    },
    test: (req, res) => {
        return res.status(200).send({
            message: "este es un test de controlador"
        });
    },

    importFromExcel: (req, res) => {
        var XLSX = require("xlsx");
        var workbook = XLSX.readFile("./files/material.xls");
        res.status(200).send(workbook.Sheets["Hoja1"]);
    }





};

module.exports = controller;