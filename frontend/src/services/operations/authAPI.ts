import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { AxiosResponse } from "axios";
import { apiConnector } from "../apiconnector";
import { auth } from "../endpoints";
import toast from "react-hot-toast";
import { setUser } from "../../store/slices/profile.slice";
import { setToken } from "../../store/slices/auth.slice";
import { setItemToLocalStorage } from "../../utils/localStorage";

// send the otp to the email
export async function sendOTP(email: string, navigate: NavigateFunction) {
  const toastId = toast.loading("Sending Otp...");
  try {
    // redirect the user if success
    const response: AxiosResponse = await apiConnector(
      auth.SEND_OTP.method,
      auth.SEND_OTP.url,
      {
        email,
      },
    );
    if (!response.data.success) {
      throw response.data;
    }
    toast.success(response.data.message);
    navigate("/verify-email");
    return;
  } catch (error: any) {
    console.error("Error Sending OTP ", error.message);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
}

export function login(
  email: string,
  password: string,
  navigate: NavigateFunction,
) {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await apiConnector(auth.LOGIN.method, auth.LOGIN.url, {
        email,
        password,
      });
      setItemToLocalStorage("user", res.data.user);
      setItemToLocalStorage("token", res.data.token);
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success(res.data.message);
      navigate("/dashboard/my-profile");
    } catch (error: any) {
      console.error(error);
      toast.error("Error login user");
    }
  };
}

export function signup(
  data: { [key: string]: string },
  otp: string,
  navigate: NavigateFunction,
) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Registering ...");
    try {
      const response: AxiosResponse = await apiConnector(
        auth.REGISTER.method,
        auth.REGISTER.url,
        { ...data, otp },
      );
      if (!response.data.success) {
        throw response;
      }
      console.log(response.data);
      dispatch(setUser(response.data.user));
      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      console.error("ERROR REGISTERING : ", error);
      toast.error(error?.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function logout(navigate: NavigateFunction) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Logging Out...");
    try {
      //build this
      const response = await apiConnector(auth.LOGOUT.method, auth.LOGOUT.url);
      if (!response.data.success) {
        throw response.data;
      }
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.clear();
      toast.success(response.data.message);
      navigate("/");
    } catch (error: any) {
      toast.error("Error Logging Out");
      console.error(error?.message || error);
    } finally {
      toast.dismiss(toastId);
    }
  };
}
