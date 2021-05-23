import React from "react";
import logo from "../assets/images/logotipo.png";
import { Link } from "react-router-dom";
import { Header } from "antd/lib/layout/layout";
import { Menu } from "antd";

const MyHeader = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" height={55}>
        <Menu.Item key="0">
          <Link to="/">
            <img
              id="logo"
              height={50}
              src={logo}
              alt="Biblioteca Mariano Moreno"
            />
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/">Inicio</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/uploadExcel">Importar</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link>ete sech</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default MyHeader;
