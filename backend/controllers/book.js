'use strict'


var Book = require('../models/book');



var controller = {
    all: (req, res) => {
        return res.status(200).send({})
    },



    test: (req, res) => {
        return res.status(200).send({
            message: "este es un test de controlador"
        });
    },

    //ruta de importacion desde el excel

    importFromExcel: (req, res) => {
        var XLSX = require("xlsx");
        var workbook = XLSX.readFile("./files/material.xls");
        var lastOldId = 0;
        Book.find({}).sort({
            idOld: -1
        }).limit(1).exec((err, doc) => {
            if (err) {
                console.log("error con la query de busqueda del ultimo libro ingresado!");

            } else if (doc) {
                lastOldId = doc[0].idOld;
                console.log("el log no es undefined! seteamos en " + lastOldId);

            } else {
                console.log("no se encontro elementos en la base de datos, se carga desde el inicio");

            }
            console.log()


            var books = extractNewBooks(workbook, lastOldId);

            Book.insertMany(books, (err, docs) => {
                if (err) {
                    return res.status(500).send({
                        message: "error cargando los libros del excel"
                    })
                } else {
                    return res.status(200).send({
                        message: "carga de los libros del excel correcta!!!!!!! " + docs.length + "nuevos libros agregados"
                    })
                }
            })



        });
    }





};

// columnas 
/* columnas con datos 
     B : titulo
     C: oldID
     D: editorial
     E: genero 
     F: subgenero
     G: tipo (libro revista)
     H: autores
     J: codigo 
 */
function extractNewBooks(workbook, lastID) {
    var start_line = 7; //fila donde se encuentra el elemento de id 0
    var books = [];

    var actual_line = start_line;


    var sheet = workbook.Sheets["Hoja1"];

    while (sheet["C" + actual_line] && (sheet["C" + actual_line].v <= lastID)) {
            actual_line++;
        }


        console.log("se empieza a registrar desde la linea " + actual_line);


        var newBooks = [];
        while (sheet["C" + actual_line]) { //mientras tenga un oldid

            if (sheet["B" + actual_line]) { // si tiene titulo 

                newBooks.push(parseBookAtLine(sheet, actual_line));

            }
            actual_line++;
        }

        return newBooks;



    }

    function parseBookAtLine(sheet, line) {



        return {
            title: sheet["B" + line] ? sheet["B" + line].v : undefined,
            author: sheet["H" + line] ? sheet["H" + line].v : undefined,
            publisher: sheet["D" + line] ? sheet["D" + line].v : undefined,
            genre: sheet["E" + line] ? sheet["E" + line].v : undefined,
            subgenre: sheet["F" + line] ? sheet["F" + line].v : undefined,
            type: sheet["G" + line] ? sheet["G" + line].v : undefined,
            codNOrder: sheet["J" + line] ? sheet["J" + line].v : undefined,
            idOld: sheet["C" + line] ? sheet["C" + line].v : undefined
        }
    }


    module.exports = controller;