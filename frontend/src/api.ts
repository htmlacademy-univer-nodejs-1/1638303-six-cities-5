import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { toast } from "react-toastify";

import { Token } from "./utils";

const BACKEND_URL = "http://localhost:4000";
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = Token.get();

    if (token && config.headers) {
      config.headers["x-token"] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      toast.dismiss();
      const errorMessage =
        (error.response?.data as any)?.error || error.message;
      toast.warn(errorMessage);

      return Promise.reject(error);
    },
  );

  return api;
};
