import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookDisplay from "./BooksDisplay";
import UploadExcel from "./UploadExcel";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";

class Router extends Component {
  render() {
    return (
      //rutas y paginas
      
        <BrowserRouter>
        <Header />
          <Switch>
            <div className="center">
              <div className="content">
                <Route exact path="/" component={BookDisplay} />
                <Route path="/uploadExcel" component={UploadExcel} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </div>
            </div>
          </Switch>
        </BrowserRouter>
      
    );
  }
}

export default Router;
