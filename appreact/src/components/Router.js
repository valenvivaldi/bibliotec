import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookDisplay from "./BooksDisplay";
import UploadExcel from './UploadExcel';

class Router extends Component {
  render() {
    return (
      //rutas y paginas
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={BookDisplay} />
          <Route path="/uploadExcel" component={UploadExcel} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;