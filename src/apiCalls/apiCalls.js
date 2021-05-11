import axios from "axios";

export const getHomePage = () => {
  return axios.get("http://178.128.196.62:5000");
};

export const postFile = (file) => {
  return axios.post("http://178.128.196.62:5000/upload", file);
};
