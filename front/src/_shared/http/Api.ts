import axios from "axios";
import { _tokenService } from "../auth/TokenService";
import { _authService } from "../auth/AuthService";

export const apiConfig = {
  baseURL: import.meta.env.VITE_APIURL,
  headers: {'authorization': 'bearer ' + _tokenService.getToken()}
}

export const api = axios.create(apiConfig);

api.interceptors.response.use(response => {
  return response;
}, error => {
  // if (error.response.status === 401) {
  //   _authService.logout();
  //   window.location.replace("/login")
  // }
  return error;
});