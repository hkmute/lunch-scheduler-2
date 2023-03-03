import axios, { AxiosError } from "axios";
import { API_HOST } from "@env";

const apiClient = axios.create({
  baseURL: API_HOST,
  timeout: 5000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request interceptor", error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response interceptor", response.config.url, response.data);
    return response.data.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(
      "response interceptor",
      JSON.stringify(error.response?.data, null, 2)
    );
    return Promise.reject(error);
  }
);

export default apiClient;
