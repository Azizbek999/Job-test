import axios from "axios";

const API_URL = "http://localhost:4040/api";

const signup = (name, email, password, gender, photo, birthDate) => {
  return axios
    .post(API_URL + "/auth/register", {
      name,
      email,
      password,
      gender,
      photo,
      birthDate,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const patch = (name, email, password, photo, id) => {
  return axios
    .patch(API_URL + "/account/find/:" + id +"?id="+id, {
      name,
      email,
      password,
      photo,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  patch,
  getCurrentUser,
};

export default authService;
