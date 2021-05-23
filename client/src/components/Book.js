import { List, Descriptions } from "antd";
import React from "react";

const Book = (props) => {
  return (
    <List.Item>
      <Descriptions title={props.bookData.titulo} >
        <Descriptions.Item label="Autor">{props.bookData.autor}</Descriptions.Item>
        <Descriptions.Item label="Editorial">{props.bookData.editorial}</Descriptions.Item>
      </Descriptions>
    </List.Item>
  );
};

export default Book;
