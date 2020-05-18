import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookDisplay from "./BooksDisplay";

class Router extends Component {
  render() {
    return (
      //rutas y paginas
      <BrowserRouter>
        <Switch>
            <Route path="/" component={BookDisplay}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;