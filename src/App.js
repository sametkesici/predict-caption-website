import React, { useEffect, useState } from "react";
import { getHomePage, postFile } from "./apiCalls/apiCalls";
import AutoUploadImage from "./component/AutoUploadImage";
import ReactWordcloud from "react-wordcloud";
import Speech from "react-speech";
import { Translator, Translate } from "react-auto-translate";
import ReactLogo from "./volume.svg";

const App = () => {
  const [newImage, setNewImage] = useState();
  const [predict, setPredict] = useState();
  const [base64, setBase64] = useState();

  let words = [];

  useEffect(() => {
    if (predict) {
      predict
        .split("<")[0]
        .split(":")[1]
        .split(" ")
        .forEach((element) => {
          words.push({
            text: element,
            value: Math.floor(Math.random() * 200) + 40,
          });
        });
    }
  }, [predict]);

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
    const attachment = new FormData();
    attachment.append("photo", file);
    const response = await postFile(attachment);
    let string = response.data.response.base.split(": b")[1];

    string = string.replaceAll("'", "");

    setBase64(string);
    setPredict(response.data.response.predict);
  };

  const options = {
    rotations: 2,
    fontSizes: [64, 128],
    rotationAngles: [-90, 0],
  };

  return (
    <div className="App d-flex flex-row">
      <div className="body">
        <div
          className="header rounded block-example border border-dark"
          style={{ width: "50rem", height: "200px", margin: 5 }}
        >
          <div className="ml-2 d-flex flex-row justify-content-between">
            <img
              style={{ marginTop: 16, height: "20%", width: "20%" }}
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
              </form>
              <AutoUploadImage image={newImage}></AutoUploadImage>
            </div>
          </div>
        </div>
        <div
          className="card mt-4 rounded block-example border border-dark"
          style={{ width: "50rem", height: "500px", marginLeft: 5 }}
        >
          <div className="card-body">
            <p className="card-text">{predict}</p>
            {predict ? (
              <div>
                <Speech
                  text={predict.split("<")[0].split(":")[1]}
                  textAsButton="true"
                  lang="EN-US"
                  voice="Google UK English Female"
                  pitch="1"
                  rate="0.9"
                />
                <img src={ReactLogo} width="32px" height="32px"></img>
              </div>
            ) : (
              ""
            )}
            {predict ? (
              <Translator
                from="en"
                to="tr"
                googleApiKey="AIzaSyDT5UPzbply9mMWQwwQx8CRkj4yICoM98A"
              >
                <h1>
                  <Translate>{predict.split("<")[0].split(":")[1]}</Translate>
                </h1>
              </Translator>
            ) : (
              ""
            )}
          </div>
          <img
            className="card-img-top"
            src={`data:image/png;base64,${base64}`}
            alt=""
          ></img>
        </div>
      </div>
      <div
        className="wordCloud  ml-20"
        style={{ marginLeft: 20, marginTop: 200 }}
      >
        <ReactWordcloud options={options} size={[600, 400]} words={words} />
      </div>
    </div>
  );
};

export default App;
