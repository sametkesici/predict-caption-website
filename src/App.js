import React, { useEffect, useState } from "react";
import { getHomePage, postFile } from "./apiCalls/apiCalls";
import AutoUploadImage from "./component/AutoUploadImage";
import ReactWordcloud from 'react-wordcloud';

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

  const words = [
    {
      text: 'told',
      value: Math.floor(Math.random() * 200) + 40,
    },
    {
      text: 'mistake',
      value: Math.floor(Math.random() * 200) + 40,
    },
    {
      text: 'thought',
      value: Math.floor(Math.random() * 200) + 40,
    },
    {
      text: 'bad',
      value: Math.floor(Math.random() * 200) + 40,
    },{
      text: 'told',
      value: Math.floor(Math.random() * 200) + 40,
    },
    
  ]

  return (
    <div className="App d-flex flex-row">
      <div className="body">


        <div className="header rounded block-example border border-dark" style={{ width: "50rem", height: "200px", margin: 5 }}>

          <div className="ml-2 d-flex flex-row justify-content-between">
            <img
              style={{marginTop: 16, height: "20%", width: "20%" }}
              alt="blabla"
              src="http://max-image-caption-generator-web-app.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud/static/img/codait-logo.jpg"
            ></img>
            <span className="m-2 mt-8" style={{ fontSize: 36 }}>
              Image Caption <br /> Generator
            </span>
            <div style={{ height: 180, width: 300 }} className="card p-1 m-2">
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
        </div>
        <div className="card mt-4 rounded block-example border border-dark" style={{ width: "50rem", height: "500px", marginLeft: 5 }}>
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
      <div className="wordCloud  ml-20" style={{  marginLeft: 20, marginTop: 200 }}>
        <ReactWordcloud size= {[600, 400]} words={words} />
      </div>
    </div>
  );
};

export default App;
