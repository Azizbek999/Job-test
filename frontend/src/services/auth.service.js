import axios from "axios";
import authHeader from "./auth-header";

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
    .patch(API_URL + "/account/find/" + id, {
      name,
      email,
      password,
      photo,
      id,
    }, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.removeItem("userMe");
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const deleteUser = (id) => {
  axios.delete(API_URL + "/account/find/" + id, { headers: authHeader() })
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("users");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  patch,
  deleteUser,
  getCurrentUser,
};

export default authService;
