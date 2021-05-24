import React, { useEffect, useState } from "react";

import Book from "./Book";
import { Col, List, Row } from "antd";
import Search from "antd/lib/input/Search";
import { db } from "../firebase";

const BookDisplay = () => {
  const [bookList, setBookList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let books = localStorage.getItem("books");
    if(books){
      //exist books in localstorage, is current?
      db.collection("updatesBookList")

    }else{
      loadFromFirebase()

    }



  }, []);

function loadFromFirebase (){
  db.collection("books")
      .get()
      .then((querySnapshot) => {
        console.log("obtuve de firebase lo siguietne");
        console.log(querySnapshot.docs);
        localStorage.setItem()
        setBookList(querySnapshot.docs);
        localStorage.setItem("books",querySnapshot.docs);
        setSearchResults(querySnapshot.docs.slice(0, 19));
      });
}

  function doSearch(value) {
    setSearchResults(
      bookList.filter((book) => {
        return (
          book.author?.toLowerCase().includes(value.toLowerCase()) ||
          book.publisher?.toLowerCase().includes(value.toLowerCase()) ||
          book.title?.toLowerCase().includes(value.toLowerCase()) ||
          book.type?.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

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
            locale={{ 
              emptyText: "No se encontraron resultados :(" }}
            dataSource={searchResults}
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
