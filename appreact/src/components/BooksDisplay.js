import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import Book from "./Book";
import loading from "../assets/images/loading.gif";

import PropTypes from "prop-types";
import { connect } from "react-redux";

var _ = require("lodash");



class BookDisplay extends Component {
  searchBarRef = new React.createRef();
  state = {
    books: [],
    quantity: 0,
    page: 0,
    perPage: 10,
    status: null,
    search: null,
    readed: [],
  };

  componentDidMount() {
    this.searchBooks("");
  }

  doSearch = (e) => {
    e.preventDefault();

    this.searchBooks(this.searchBarRef.current.value);
  };

  getReaded = () => {
    console.log('HACEMOS EL GETREADED');
    axios
      .get(Global.url + "user/getReaded?id=" + this.props.auth.user.id)
      .then((res) => {
        // console.log('esta es la red de getreaded '+res);
        if(res){

          this.setState({
            readed: res.data,
          });
        }
      })
      .catch((err) => {
        this.setState({ status: "error" });
        console.log(err);
      });
  };

  switchReaded = (bookid) => {
    axios.post(Global.url + "book/switchReaded", {
      dni: this.props.auth.user.dni,
      bookid: bookid,
    }).then((response)=>{
      console.log('llega aca')
      this.getReaded();
    });
  };

  searchBooks = (searchTerm) => {
    if (this.props.auth.isAuthenticated) {
      this.getReaded();
    }
    this.setState({ page: 0, search: this.searchBarRef.current.value }, () => {
      this.updateQuantity(this.state.search);
      this.getBooks(this.state.search);
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

  updateQuantity = (s) => {
    axios.get(Global.url + "book/quantity?searchTerm=" + s).then((res) => {
      this.setState({ quantity: res.data.quantity });
    });
  };

  changePage(i) {
    this.setState({ page: this.state.page + i }, () => {
      this.getBooks();
    });
  }
  getBooks = () => {
    var searchTerm = this.state.search;
    var route;
    if (searchTerm === "") {
      route = "book";
    } else {
      route = "book/search/" + searchTerm;
    }

    this.setState({ status: "loading" }, () => {
      axios
        .get(
          Global.url +
            route +
            "/?page=" +
            this.state.page +
            "&perPage=" +
            this.state.perPage
        )
        .then((res) => {
          this.setState({
            books: res.data,
            status: "success",
          });
        })
        .catch((err) => {
          this.setState({ status: "error" });
          // console.log(err);
        });
    });
  };

  isReaded(bookid) {
    // console.log('estoy en isreaded');
    // console.log(this.state.readed);
    if (!this.state.readed) {
      return false;
    } else {
      // console.log(this.state.readed);
      return this.state.readed.indexOf(bookid) >= 0;
    }
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

        {this.state.quantity === 0 && this.state.status === "success" && (
          <p>No hay resultados correspondientes a esa busqueda.</p>
        )}
        <section className="bookList">
          
          {this.state.books.map((book, i) => {
            let checkreaded = this.isReaded(book._id);
            return (
              <Book
                key={book._id}
                data={book}
                isreaded={checkreaded}
                switchFunc={this.switchReaded}
              />
            );
          })}
        </section>

        <div className="pageBar">
          {this.state.page > 0 && (
            <input
              type="button"
              className="pageButtons"
              name="back"
              value="<"
              onClick={this.backPage}
            ></input>
          )}

          {(this.state.page + 1) * this.state.perPage <=
            this.state.quantity && (
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

BookDisplay.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(BookDisplay);
