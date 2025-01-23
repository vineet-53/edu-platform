import axios, {
    AxiosHeaders,
    AxiosInstance,
    AxiosRequestConfig,
    Method,
  } from "axios";
  
  const axiosConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/api/v1/",
  };
  
  export const axiosInstance: AxiosInstance = axios.create(axiosConfig);
  
  export const apiConnector = (
    method: Method, 
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
  