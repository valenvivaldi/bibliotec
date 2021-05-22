import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import Book from "./Book";
import loading from "../assets/images/loading.gif";
import { Col, Row } from "antd";
import Search from "antd/lib/input/Search";

const BookDisplay = () => {
  return <Row >
    <Col span={10} offset={7}
      style={{marginTop:"1%"}}
    >
      <Search></Search>
    </Col>
  </Row>;
};

export default BookDisplay;
