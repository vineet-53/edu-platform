import axios, {
    AxiosHeaders,
    AxiosInstance,
    AxiosRequestConfig,
    Method,
  } from "axios";
import { getItemFromLocalStorage } from "../utils/localStorage";

  axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
  axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'
  
  const axiosConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/api/v1/",
    headers : { 
      "x-auth-token" : `${getItemFromLocalStorage('token')}`
    }
  };
  
  export const axiosInstance: AxiosInstance = axios.create(axiosConfig);
  
  export const apiConnector = (
    method: Method | string, 
    url: string,
    bodyData?: any,
    headers?: AxiosHeaders | Record<string, string>, 
    params?: string
  ) => {
    return axiosInstance({
      method,
      url,
      data: bodyData || null, 
      headers: headers || undefined, 
      params: params || undefined, 
    });
  };
  