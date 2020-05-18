import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import Book from "./Book";

class BookDisplay extends Component {
  searchBarRef = new React.createRef();
  state = {
    books: [],
    status: null,
  };

  componentDidMount() {
    this.searchBooks("");
  }

  doSearch = (e) => {
    e.preventDefault();
    console.log(this.searchBarRef.current);
    this.searchBooks(this.searchBarRef.current.value);
  };

  searchBooks = (searchTerm) => {
    console.log("searchterm trae lo siguiente" + searchTerm);

    var route;
    if (searchTerm === "") {
      route = "book";
    } else {
      route = "book/search/" + searchTerm;
    }
    console.log("axios va a hacer get en " + Global.url + route);

    axios
      .get(Global.url + route)
      .then((res) => {
        console.log('recibio el get! el primer libro es '+res.data[0].title);
        this.setState({
          books: res.data,
          status: "success",
        });
      })
      .catch((err) => {
        this.setState({ status: "error" });
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <form className='searchForm' onSubmit={this.doSearch}>
          <input type="text" className ='searchBar' name="search" ref={this.searchBarRef} />
          <input type='submit' className='searchButton' value='Buscar'></input>
        </form>

        <hr />
        <section className="bookList">
          {this.state.books.map((book, i) => {
            return <Book key={book.idOld} data={book} />;
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default BookDisplay;
