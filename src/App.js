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
      <form encType="multipart/form-data">
        <input onChange={onChangeFile} type="file" name="photo" />
      </form>
      <AutoUploadImage image={newImage}></AutoUploadImage>
    </div>
  );
};

export default App;
