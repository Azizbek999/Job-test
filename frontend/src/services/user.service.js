import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api";

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
