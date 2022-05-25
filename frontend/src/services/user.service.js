import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5050/api";
// const API_URL = "https://secure-mesa-30650.herokuapp.com/api";

const getAllPeople = () => {
  return axios
    .get(API_URL + "/people", { headers: authHeader() })
};

const nothing = () => {
  getAllPeople();
  return JSON.parse(localStorage.getItem("users"));
};

const userService = {
  getAllPeople,
  nothing,
};

export default userService;
