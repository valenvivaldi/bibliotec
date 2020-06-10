import React, { Component } from "react";

class Book extends Component {
  data = this.props.data;
  render() {
    return (
      
      <div className="bookData">
        <div className="booktitle">{this.data.title}</div>
        <div className="bookauthor">
          {this.data.author === "VARIOS" && "AUTORES "}
          {this.data.author}
        </div>
        <button className='readedButton'>{this.props.readed ? "leido" : "no leido"}</button>
        <div className="bookpublisher">{this.data.publisher}</div>
      </div>
    );
  }
}

export default Book;
