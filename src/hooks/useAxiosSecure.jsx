import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
   

    const resInterCeptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async(error) => {
         const statusCode = error?.response?.status; 
      if (statusCode === 401 || statusCode === 403) {
         await logOut();
        navigate("/login", { replace: true }); 
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterCeptor);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;