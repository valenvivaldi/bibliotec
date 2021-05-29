import { Spin, Button, Input, Row, Col } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { db } from "../firebase";

const UploadExcel = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const processExcel = () => {
    console.log("file es?");
    console.log(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        console.log(
          "estoy en el onload, voy a imprimir lo que me da el archivo"
        );
        var data = new Uint8Array(e.target.result);

        var workbook = XLSX.read(data, { type: "array" });
        calcLastId().then((res) => {
          console.log("calculo el ultimo oldId");
          let lastId = 0;
          if (res.docs.length > 0) {
            console.log("el valor retornado por la funcion de oldid");
            console.log(res.docs[0].data().idOld);
            lastId = res.docs[0].data().idOld;
          }
          console.log(lastId);
          let newBooks = extractNewBooks(workbook, lastId);
          setLoading(true);
          let batch = db.batch();
          for (var i = 0; i < newBooks.length; i++) {
            if (i === 500) {
              console.log("proceso de carga parcial, se llegaron a lso 500");
              break;
            }
            batch.set(db.collection("books").doc(), newBooks[i]);
          }
          batch.commit().then(function () {
            console.log("se termino la carga!!!");
            setLoading(false);
            db.collection("updatesBookList").doc().set({ date: new Date() });
          });
        });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  function calcLastId() {
    const booksRef = db.collection("books");
    return booksRef.orderBy("idOld", "desc").limit(1).get();
  }

  function extractNewBooks(workbook, lastID) {
    var start_line = 7; //fila donde se encuentra el elemento de id 0
    var actual_line = start_line;
    var sheet = workbook.Sheets["Hoja1"];
    while (sheet["C" + actual_line] && sheet["C" + actual_line].v <= lastID) {
      actual_line++;
    }
    console.log("se empieza a registrar desde la linea " + actual_line);
    var newBooks = [];
    while (sheet["C" + actual_line]) {
      //mientras tenga un oldid
      if (sheet["B" + actual_line]) {
        // si tiene titulo
        newBooks.push(parseBookAtLine(sheet, actual_line));
      }
      actual_line++;
    }
    return newBooks;
  }

  function parseBookAtLine(sheet, line) {
    return {
      title: sheet["B" + line] ? sheet["B" + line].v : "",
      author: sheet["H" + line] ? sheet["H" + line].v : "",
      publisher: sheet["D" + line] ? sheet["D" + line].v : "",
      genre: sheet["E" + line] ? sheet["E" + line].v : "",
      subgenre: sheet["F" + line] ? sheet["F" + line].v : "",
      type: sheet["G" + line] ? sheet["G" + line].v : "",
      codNOrder: sheet["J" + line] ? sheet["J" + line].v : "",
      idOld: sheet["C" + line] ? sheet["C" + line].v : 1,
    };
  }

  return (
    <Row>
      <Col span={6} offset={9}>
        <Input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <Spin
          spinning={loading}  
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
        <Button onClick={processExcel} icon={<UploadOutlined />}>
          Importar
        </Button>
      </Col>
    </Row>
  );
};

export default UploadExcel;
