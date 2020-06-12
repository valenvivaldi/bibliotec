import React, { Component } from "react";

//import for use Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Book extends Component {
  data = this.props.data;
  
  doSwitch = () => {
    this.props.switchFunc(this.props.data._id, this.props.isreaded);
  };

  render() {
    return (
      <div className="bookData">
        <div className="booktitle">{this.data.title}</div>
        <div className="bookauthor">
          {this.data.author === "VARIOS" && "AUTORES "}
          {this.data.author}
        </div>
        {this.props.auth.isAuthenticated && (
          <button className="readedButton" onClick={this.doSwitch}>
            {this.props.isreaded ? "leido" : "no leido"}
          </button>
        )}
        <div className="bookpublisher">{this.data.publisher}</div>
      </div>
    );
  }
}

Book.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Book);
