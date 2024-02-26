import axios from "axios";
import { serviceURL } from "../constant/serviceURL";
import { getCookie } from "typescript-cookie";
export const instance = axios.create({
  baseURL: serviceURL,
});

instance.interceptors.request.use(
  function (config) {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
