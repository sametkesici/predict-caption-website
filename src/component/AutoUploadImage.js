import React from "react";

const AutoUploadImage = ({ image }) => {
  return (
    <div style={{ width: 180 }}>
      <img className="img-thumbnail" src={image} />
      <div className="overlay">
        <div className="d-flex justify-content-center h-100">
          <div className="spinner-border text-light m-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AutoUploadImage;
