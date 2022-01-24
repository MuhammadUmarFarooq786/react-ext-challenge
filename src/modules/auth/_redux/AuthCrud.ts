import axios, { AxiosRequestConfig } from "axios";
import { AUTH_URL } from "../constants";
import { LoginDetails } from "./types";


const config: AxiosRequestConfig = {
  headers: {
    "content-type": "application/json",
  },
};

// CREATE =>  POST: add a new employee to the server
export function login(loginDetails: LoginDetails) {
  return axios.post(`${AUTH_URL}/login`, loginDetails, config);
}