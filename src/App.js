import React, { useEffect, useState } from "react";
import { getHomePage, postFile } from "./apiCalls/apiCalls";
import AutoUploadImage from "./component/AutoUploadImage";

const App = () => {
  const [newImage, setNewImage] = useState();
  const [selectedFile, setSelecetedFile] = useState();

  const onChangeFile = (e) => {
    if (e.target.files.length < 1) {
      return;
    }
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      console.log(file);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    const attachment = new FormData();
    attachment.append("photo", file);
    const response = await postFile(attachment);
    console.log(response);
  };

  return (
    <div className="App">
      <div className="ml-5 d-flex flex-row">
        <img
          style={{ height: "10%", width: "10%" }}
          alt="blabla"
          src="http://max-image-caption-generator-web-app.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud/static/img/codait-logo.jpg"
        ></img>
        <span className="ml-4" style={{ fontSize: 36 }}>
          Image Caption Generator
        </span>
        <div style={{ height: "15%", width: "15%" }} className="card p-1 ml-4">
          <form className="form-group" encType="multipart/form-data">
            <input
              className="form-control-file"
              onChange={onChangeFile}
              type="file"
              name="photo"
            />
          </form>
          <AutoUploadImage image={newImage}></AutoUploadImage>
        </div>
      </div>
      <div className="card mt-4 p-4" style={{ width: "32rem" }}>
        <img className="card-img-top" alt="..."></img>
        <div className="card-body">
          <p className="card-text">blabla</p>
        </div>
      </div>
    </div>
  );
};

export default App;
