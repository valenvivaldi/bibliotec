import { List, Descriptions } from "antd";
import {VideoCameraOutlined,BookOutlined,ReadOutlined}  from "@ant-design/icons"
import React from "react";

const Book = (props) => {
  console.log(props.bookData);
  return (
    <List.Item>
      <Descriptions title={props.bookData.title} >
        <Descriptions.Item label="Tipo">{props.bookData.type}{props.bookData.type==="VIDEO" && <VideoCameraOutlined />}{props.bookData.type!=="VIDEO" && <ReadOutlined />}</Descriptions.Item>
        <Descriptions.Item label="Autor">{props.bookData.author}</Descriptions.Item>
        <Descriptions.Item label="Editorial">{props.bookData.publisher}</Descriptions.Item>
        <Descriptions.Item label="Genero">{props.bookData.genre}</Descriptions.Item>
        <Descriptions.Item label="Subgenero">{props.bookData.subgenre}</Descriptions.Item>

      </Descriptions>
    </List.Item>
  );
};

export default Book;
