import React, { useEffect, useState } from "react";

import Book from "./Book";
import { Col, List, Row } from "antd";
import Search from "antd/lib/input/Search";
import { db } from "../firebase";

const BookDisplay = () => {
  const [bookList, setBookList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const day = 1000 * 60 * 60 * 24;
  useEffect(() => {
    let books = localStorage.getItem("books");

    let lastLoad = localStorage.getItem("lastLoad");
    if (!books || !lastLoad || ((new Date() - lastLoad) / day > 2)) {
      console.log("cargo desde firebase");
      loadFromFirebase();
    
    }else{
      console.log("asd");
      console.log(books);
      setBookList(books);
      setSearchResults(books.slice(0,19));

    } 
  }, []);

  function loadFromFirebase() {
    db.collection("books")
      .get()
      .then((querySnapshot) => {
        console.log("obtuve de firebase lo siguietne");
        console.log(querySnapshot.docs);
        let arr = querySnapshot.docs.map((b) => b.data());
        localStorage.setItem("books", arr);
        setBookList(arr);
        localStorage.setItem("lastLoad", new Date());
        setSearchResults(arr.slice(0, 19));
      },(err)=>{
        console.error();;
      });
  }

  function doSearch(value) {
    setSearchResults(
      bookList.filter((book) => {
        return (
          (book.author &&
            book.author.toLowerCase().includes(value.toLowerCase())) ||
          (book.publisher &&
            book.publisher.toLowerCase().includes(value.toLowerCase())) ||
          (book.title &&
            book.title.toLowerCase().includes(value.toLowerCase())) ||
          (book.type && book.type.toLowerCase().includes(value.toLowerCase()))
        );
      })
    );
  }

  return (
    <React.Fragment>
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
            locale={{
              emptyText: "No se encontraron resultados :(",
            }}
            dataSource={searchResults}
            renderItem={(book, index) => {
              return <Book bookData={book} />;
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BookDisplay;
