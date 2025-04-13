import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

const apiRequest = async ({
  method = "GET",
  url = "",
  auth = false,
  data = {},
  paginate = false,
  multipart = false,
  signal,
}) => {
  try {
    const token = auth
      ? document.cookie
          ?.split("; ")
          ?.find((row) => row.startsWith("lutui-auth-token="))
          ?.split("=")[1]
      : null;
    let reqObj = {
      url,
      method,
      withCredentials: auth,
      signal,
    };
    if (method === "POST" || method === "PUT") {
      reqObj = { ...reqObj, data };
      if (multipart) {
        reqObj = {
          ...reqObj,
          header: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        };
      }
    }
    if (auth && token) {
      reqObj.headers = {
        ...(reqObj.headers || {}),
        'lutui-auth-token': token,
      };
    }

    const response = await api({ ...reqObj });
    return response.data
      ? { ...response.data, statusCode: response.status }
      : null;
  } catch (e) {
    console.log("Error in apiRequest method: ", e)
    let response = null;
    if (e.response) {
      response = e.response.data
        ? { ...e.response.data, statusCode: e.response.status }
        : {
            success: false,
            statusCode: 500,
            message: "Something went wrong in server.",
          };
    } else {
      response = {
        success: false,
        statusCode: 500,
        message: "Something went wrong!!!",
      };
    }
    if (paginate && !response.pagination) {
      const pagination = {
        total: 0,
        page_records: 0,
        page_no: 1,
        total_pages: 1,
        next_page: null,
        prev_page: null,
      };
      response = { ...response, pagination };
    }
    return response;
  }
};

export const loginUser = async (data) => {
  return await apiRequest({ method: "POST", url: "/user/login", data });
};

export const logoutUser = async (data) => {
  return await apiRequest({ method: "GET", auth: true, url: "/user/logout" });
};

export const registerUser = async (data) => {
  return await apiRequest({ method: "POST", url: "/user/signup", data });
};

export const getCurrentUser = async ({ signal = null }) => {
  return await apiRequest({
    method: "GET",
    auth: true,
    signal,
    url: "/user/getCurrentUser",
  });
};

export const createProduct = async (data) => {
  return await apiRequest({
    method: "POST",
    auth: true,
    data,
    url: `/product/create-product`,
  });
};

export const getProductByID = async ({ signal = null, productId = "" }) => {
  return await apiRequest({
    method: "GET",
    signal,
    url: `/product/get-product-by-id?productId=${productId}`,
  });
};

export const getProductList = async ({
  signal = null,
  limit = 10,
  page = 1,
  category = "",
  subCategory = "",
}) => {
  return await apiRequest({
    method: "GET",
    paginate: true,
    signal,
    url: `/product/get-products?page=${page}&limit=${limit}&category=${category}&subCategory=${subCategory}`,
  });
};

export const getCart = async ({ signal = null, userId }) => {
  return await apiRequest({
    method: "GET",
    auth: true,
    signal,
    url: `/orders/get-cart-details/${userId}`,
  });
};

export const getOrders = async ({
  signal = null,
  limit = 10,
  page = 1,
  userId = "",
  paymentStatus = "",
}) => {
  return await apiRequest({
    method: "GET",
    signal,
    paginate: true,
    url: `/product/get-orders?page=${page}&limit=${limit}&userId=${userId}&paymentStatus=${paymentStatus}`,
  });
};

export const addToCart = async (data) => {
  return await apiRequest({
    method: "POST",
    auth: true,
    data,
    url: `/orders/add-to-cart`,
  });
};

export const removeItemsFromCart = async (data) => {
  return await apiRequest({
    method: "POST",
    auth: true,
    data,
    url: `/orders/remove-item-from-cart`,
  });
};

export const removeAnItemFromCart = async (data) => {
  return await apiRequest({
    method: "POST",
    auth: true,
    data,
    url: `/orders/remove-count-from-cart`,
  });
};

export const createPayment = async (data) => {
  return await apiRequest({
    method: "POST",
    auth: true,
    data,
    url: `/create-payment`,
  });
};

export const verifyPayment = async (data) => {
  return await apiRequest({
    method: "POST",
    auth: true,
    data,
    url: `/verify-payment`,
  });
};

export const checkoutCart = async (data) => {
  return await apiRequest({
    method: "POST",
    auth: true,
    data,
    url: `/orders/checkout`,
  });
};
