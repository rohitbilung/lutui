import axios from "axios"
import { API_URL } from "../config";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

const apiRequest = async ({ method = "GET", url = '', auth = false, data = {}, paginate = false, multipart = false, signal }) => {
  try {
    let reqObj = {
      url,
      method,
      withCredentials: auth,
      signal
    }
    if (method === "POST" || method === "PUT") {
      reqObj = { ...reqObj, data }
      if (multipart) {
        reqObj = {
          ...reqObj,
          header: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      }
    }

    const response = await api({ ...reqObj })
    return response.data ? { ...response.data, statusCode: response.status } : null;
  } catch (e) {
    let response = null;
    if (e.response) {
      response = e.response.data ? { ...e.response.data, statusCode: e.response.status } : { success: false, statusCode: 500, message: "Something went wrong in server." };
    } else {
      response = { success: false, statusCode: 500, message: "Something went wrong!!!" };
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
}

export const loginUser = async (data) => {
  return await apiRequest({ method: "POST", url: '/user/login', data });
}

export const registerUser = async (data) => {
  return await apiRequest({ method: "POST", url: '/user/signup', data });
}

export const getProductList = async () => {
  return await apiRequest({ method: "GET", url: '/product/get-products' });
}
