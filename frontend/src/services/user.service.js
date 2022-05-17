import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api";

const getAllPeople = () => {
  return axios.get(API_URL + "/people", { headers: authHeader() });
};

const userService = {
  getAllPeople,
};

export default userService;
