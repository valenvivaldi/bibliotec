import React, { useEffect, useState } from "react";

import Book from "./Book";
import { Col, List, Row } from "antd";
import Search from "antd/lib/input/Search";
import { db } from "../firebase";

const BookDisplay = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    db.collection("books")
      .get()
      .then((querySnapshot) => {
        console.log("obtuve de firebase lo siguietne");
        console.log(querySnapshot.docs);
        setBookList(querySnapshot.docs);
      });
  }, []);

  function doSearch(value) {}

  return (
    <>
      <Row>
        <Col
          span={10}
          offset={7}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <Search
            placeholder="Buscar libro."
            onSearch={(value) => {
              doSearch(value);
            }}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <List
            locale={{ emptyText: "No se encontraron resultados :(" }}
            dataSource={bookList}
            renderItem={(book, index) => {
              return <Book bookData={book.data()} />;
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default BookDisplay;
