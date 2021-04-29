import axios from "axios";

export const getHomePage = () => {
  return axios.get("http://localhost:5000");
};

export const postFile = (file) => {
  return axios.post("http://localhost:5000/upload", file);
};
