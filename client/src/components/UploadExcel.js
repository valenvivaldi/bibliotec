import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
class UploadExcel extends Component {
  url = Global.url;
  state = {
    selectedFile: null,
    status: null,
    message: null,
  };

  submitFile = (e) => {
    e.preventDefault();
    console.log("submit");
    if (this.state.status === "selected" ) {
      
      this.setState({status:'loading'},()=>{

        const formData = new FormData();
        formData.append(
          "file0",
          this.state.selectedFile,
          this.state.selectedFile.name
          );
          
          axios.post(this.url + "book/importFromExcel", formData).then((res) => {
            console.log(res);
            this.setState(res.data);
          },(err)=>{
            this.setState({status:'error',message:'El archivo enviado no es valido'})
          });
        });
        }

  };

  fileChange = (event) => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
      status: "selected",
    });
  };
  render() {
    return (
      <React.Fragment>
        <form className="formUpload" onSubmit={this.submitFile}>
          {/* Haga click para seleccionar un archivo o arrastrelo hasta aquí. */}
          <input
            type="file"
            className="inputExcelFile"
            id="excelFile"
            name="file0"
            multiple="false"
            accept=".xls"
            onChange={this.fileChange}
          ></input>
          <input type="submit"></input>
        </form>
        {this.state.status === "loading" && <p className='pmessage'> CARGANDO ARCHIVO...</p>}
        {this.state.message && <p className="pmessage">{this.state.message}</p>}
      </React.Fragment>
    );
  }
}
export default UploadExcel;
