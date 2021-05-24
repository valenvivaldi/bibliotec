"use strict";

var Book = require("../models/book");
var User = require("../models/user");

var fs = require("fs");
const { userInfo } = require("os");

var controller = {
  all: (req, res) => {
    var query = Book.find().sort({ uploadDate: -1 });
    var page = parseInt(req.query.page);
    var perPage = parseInt(req.query.perPage);

    if (page !== undefined && perPage !== undefined) {
      query.skip(page * perPage).limit(perPage);
    }

    var books = query.exec((err, data) => {
      if (err) {
        console.log(err);
        return res
          .status(404)
          .send({ message: "error al solicitar todos los libros" });
      } else {
        res.status(200).send(data);
      }
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "este es un test de controlador",
    });
  },

  //ruta de importacion desde el excel

  importFromExcel: (req, res) => {
    var XLSX = require("xlsx");
    var file_name = "Archivo no subido";

    if (!req.files) {
      res.status(404).send({
        status: "error",
        message: "no llego el archivo :(",
      });
    } else {
      var file_path = req.files.file0.path;
      var splittedPath = file_path.split(".");
      var extension = splittedPath[splittedPath.length - 1];
      if (extension === "xls") {
        var workbook = XLSX.readFile(file_path);
        var lastOldId = 0;
        Book.find({})
          .sort({
            idOld: -1,
          })
          .limit(1)
          .exec((err, doc) => {
            if (err) {
              console.log(
                "error con la query de busqueda del ultimo libro ingresado!"
              );
            } else if (doc[0]) {
              lastOldId = doc[0].idOld;
              console.log("el log no es undefined! seteamos en " + lastOldId);
            } else {
              console.log(
                "no se encontro elementos en la base de datos, se carga desde el inicio"
              );
            }

            var books = extractNewBooks(workbook, lastOldId);
            if (books.length == 0) {
              return res.status(200).send({
                status: "success",
                message: "No hay libros nuevos para agregar!",
              });
            }

            Book.insertMany(books, (err, docs) => {
              if (err) {
                return res.status(500).send({
                  message: "error cargando los libros del excel",
                });
              } else {
                return res.status(200).send({
                  message:
                    "carga de los libros del excel correcta!!!!!!! " +
                    docs.length +
                    "nuevos libros agregados",
                });
              }
            });
          });
      } else {
        res.status(404).send({
          status: "error",
          message: "el archivo seleccionado no es un excel!!!",
        });
      }
      fs.unlinkSync(file_path);
    }
  },

  search: (req, res) => {
    var searchTerm = req.params.searchTerm;

    var query = Book.find({
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          author: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          genre: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          subgenre: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          codNOrder: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ],
    }).sort({
      uploadDate: -1,
    });

    var page = parseInt(req.query.page);
    var perPage = parseInt(req.query.perPage);

    if (page !== undefined && perPage !== undefined) {
      query.skip(page * perPage).limit(perPage);
    }

    var books = query.exec((err, data) => {
      if (err) {
        return res.status(404).send({
          message: "error trayendo los libros correspondientes a la busqueda",
        });
      } else {
        return res.status(200).send(data);
      }
    });
  },

  switchReaded: (req, res) => {
    console.log("estamos en switch");
    const dni = req.body.dni;
    const bookid = req.body.bookid;

    User.findOne({ dni: req.body.dni }).then((result) => {
      if (result) {
        console.log('switch! encontro el usuario')
        if (result.readed.indexOf(bookid) >= 0) {
          console.log("el elemento "+bookid+" esta en los leidos!");
          //console.log('el filter deberia dar '+result.readed[0].toString() +' '+bookid.toString()+ 'el === da'+(result.readed[0].toString() ===bookid.toString()));
          let filtered = result.readed.filter((element) => element.toString() !== bookid.toString());
          console.log('filtramos y quedo '+filtered);
          result.readed =filtered;
        } else {
          console.log(" el elemento "+bookid+" no esta en los leidos!");
          result.readed.push( bookid);
        }
        console.log('los leidos quedaran asi '+result.readed);
        result.save().then(res.status(200).send({status:'success'}));

      } else {
        res
          .status(200)
          .send({ status: "error", message: "usuario no encontrado" });
      }
    }).catch((err)=>{
      console.log('error obteniendo el user');
      console.log(err);
    });
  },

  quantity: (req, res) => {
    var query;
    var searchTerm = req.query.searchTerm;

    if (searchTerm) {
      query = Book.find({
        $or: [
          {
            title: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            author: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            genre: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            subgenre: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            codNOrder: {
              $regex: searchTerm,
              $options: "i",
            },
          },
        ],
      });
    } else {
      query = Book.find();
    }
    query.countDocuments().exec((err, data) => {
      if (err) {
        res.status(400).send({
          message: "error consultando cantidad de elementos",
          status: "error",
        });
      } else {
        res.status(200).send({ quantity: data });
      }
    });
  },
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


module.exports = controller;
