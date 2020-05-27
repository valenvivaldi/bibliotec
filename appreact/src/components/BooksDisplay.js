import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import Book from "./Book";
import loading from "../assets/images/loading.gif";

class BookDisplay extends Component {
  searchBarRef = new React.createRef();
  state = {
    books: [],
    page: 1,
    pageLength: 50,
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
    this.setState({ status: "loading" }, () => {
      axios
        .get(Global.url + route)
        .then((res) => {
          console.log("recibio el get! el primer libro es " + res.data);
          this.setState({
            books: res.data,
            page: 1,
            status: "success",
          });
        })
        .catch((err) => {
          this.setState({ status: "error" });
          console.log(err);
        });
    });
  };

  nextPage = (e) => {
    e.preventDefault();
    this.changePage(1);
  };
  backPage = (e) => {
    e.preventDefault();
    this.changePage(-1);
  };

  changePage(i) {
    this.setState({ page: this.state.page + i });
  }

  render() {
    return (
      <React.Fragment>
        <form className="searchForm" onSubmit={this.doSearch}>
          <input
            type="text"
            className="searchBar"
            name="search"
            ref={this.searchBarRef}
          />
          <input type="submit" className="searchButton" value="Buscar"></input>
        </form>

        <hr />
        {this.state.status === "loading" && (
          <img src={loading} alt="Cargando.." className="  loadingGif"></img>
        )}

        {this.state.books.length ==0 &&this.state.status==='success' && <p>No hay resultados correspondientes a esa busqueda.</p>}
        <section className="bookList">
          {this.state.books
            .slice(
              this.state.pageLength * (this.state.page - 1),
              this.state.pageLength * this.state.page
            )
            .map((book, i) => {
              return <Book key={book.idOld} data={book} />;
            })}
        </section>

        <div className="pageBar">
          {this.state.page > 1 && (
            <input
              type="button"
              className="pageButtons"
              name="back"
              value="<"
              onClick={this.backPage}
            ></input>
          )}
          {this.state.page * this.state.pageLength <
            this.state.books.length && (
            <input
              type="button"
              className="pageButtons"
              name="next"
              value=">"
              onClick={this.nextPage}
            ></input>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default BookDisplay;
