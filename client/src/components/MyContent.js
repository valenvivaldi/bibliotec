import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookDisplay from "./BooksDisplay";
import UploadExcel from "./UploadExcel";
import Login from "./Login";
import Register from "./Register";
import MyHeader from "./MyHeader";
import { Content } from "antd/lib/layout/layout";

class MyContent extends Component {
  render = () => {
    return (
      //rutas y paginas
      <Content style={{ 
         backgroundColor: "rgb(108, 240, 196)" }}>
        <BrowserRouter>
         
          <Switch>
            <Route exact path="/" component={BookDisplay} />
            <Route path="/uploadExcel" component={UploadExcel} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </Content>
    );
  };
}

export default MyContent;
