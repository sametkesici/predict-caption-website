import React, { useEffect, useState } from "react";
import { getHomePage, postFile } from "./apiCalls/apiCalls";
import AutoUploadImage from "./component/AutoUploadImage";
import decoder from "base-64";

const App = () => {
  const [newImage, setNewImage] = useState();
  const [predict, setPredict] = useState();
  const [base64, setBase64] = useState();

  const onChangeFile = (e) => {
    if (e.target.files.length < 1) {
      return;
    }
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    console.log(file);
    const attachment = new FormData();
    attachment.append("photo", file);
    const response = await postFile(attachment);
    console.log(response.data);
    let string = response.data.response.base.split(": b")[1];

    string = string.replaceAll("'", "");

    setBase64(string);
    setPredict(response.data.response.predict);
    console.log(string);
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
          <form
            onSubmit={uploadFile}
            className="form-group"
            encType="multipart/form-data"
          >
            <input
              className="form-control-file"
              onChange={onChangeFile}
              type="file"
              name="photo"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <AutoUploadImage image={newImage}></AutoUploadImage>
        </div>
      </div>
      <div className="card mt-4 " style={{ width: "64rem" }}>
        <div className="card-body">
          <p className="card-text">{predict}</p>
        </div>
        <img
          className="card-img-top"
          src={`data:image/png;base64,${base64}`}
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default App;
