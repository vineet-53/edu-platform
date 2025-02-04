import { AxiosResponse } from "axios";
import { setCart } from "../../store/slices/cart.slice";
import { setEdit, setUser } from "../../store/slices/profile.slice";
import { AppDispatch } from "../../store/store";
import { apiConnector, axiosInstance } from "../apiconnector";
import { profile } from "../endpoints";
import { setItemToLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { setToken } from "../../store/slices/auth.slice";
import { NavigateFunction } from "react-router-dom";
import { profileEnd } from "console";

export function getUserProfile() {
  return async (dispatch: AppDispatch) => {
    try {
      const response: AxiosResponse = await apiConnector(
        profile.GET_USER_DETAILS.method,
        profile.GET_USER_DETAILS.url,
      );
      if (!response.data.success) {
        throw response.data;
      }
      dispatch(setUser(response.data.user));
      dispatch(setCart(response.data.cart.cart));
      setItemToLocalStorage("user", response.data.user);
      setItemToLocalStorage("cart", response.data.cart.cart);
    } catch (err: any) {
      console.log(err?.message || err);
    }
  };
}

export function updateProfile(data: any, navigate: NavigateFunction) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector(
        profile.UPDATE_PROFILE.method,
        profile.UPDATE_PROFILE.url,
        data,
      );
      if (!response.data.success) {
        throw response.data;
      }
      console.log(response.data);
      dispatch(setUser(response.data.user));
      dispatch(setEdit(false));
      toast.success(response.data.message);
      navigate("/dashboard/my-profile");
    } catch (err: any) {
      console.error(err?.message || err);
      toast.error("Error Updating Profile");
    }
  };
}

export const getEnrolledCourses = async (
  setEnrolledCourses: (value: []) => void,
) => {
  try {
    const response = await apiConnector(
      profile.GET_ENROLLED_COURSE.method,
      profile.GET_ENROLLED_COURSE.url,
    );
    console.log("Enrolled courses  : ", response.data);
    if (!response.data.success) {
      throw response.data;
    }
    console.log(response.data);
    const res = response.data.enrolledCourses;
    setEnrolledCourses(res);
  } catch (err: any) {
    console.error(err?.message || err);
    toast.error("Error Fetching Enrolled Course");
    setEnrolledCourses([]);
  }
};

export const deleteAccount = (navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Deleting Account....");
    try {
      // delete the user from the database
      const response = await apiConnector(
        profile.DELETE_ACCOUNT.method,
        profile.DELETE_ACCOUNT.url,
      );
      if (!response.data.success) {
        throw response.data;
      }
      dispatch(setUser(null));
      dispatch(setCart(null));
      dispatch(setToken(null));
      // clear the items from  localStorage
      localStorage.clear();
      // redirect to the page
      navigate(response.data.redirectTo);
      toast.success("Account Deleted");
    } catch (err: any) {
      console.error(err);
      toast.error("Error Deleting account");
    }
    toast.dismiss(toastId);
  };
};
