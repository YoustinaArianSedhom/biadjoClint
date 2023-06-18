import axios from "../../../axios/index.js";
import store from "../../../../store/store.js";
import EncryptionHandler from "@/http/requests/auth/jwt/EncryptionHandler.js";

export default {
  init() {
    axios.interceptors.request.use(
      config => {
        // Do something before request is sent
        if (
          config.method != "get" &&
          config.headers["Content-Type"] != "multipart/form-data"
        ) {
          config.data = EncryptionHandler.encrypt(config.data);
        }

        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        if (response.status === 200 || response.status === 201) {
          response.data = EncryptionHandler.decrypt(response.data);

          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      error => {
        if (error.response.status) {
          error.response.data = EncryptionHandler.decrypt(error.response.data);
          switch (error.response.status) {
            case 415:
              console.log("");
              break;
            case 401:
              store.state.SessionExpired = true;
              store.dispatch("auth/logout");
              break;
            case 403:
              console.log("");
              break;
            case 404:
              console.log("");
              break;
            case 502:
              console.log("");
          }
          return Promise.reject(error);
        }
      }
    );
  },
  login(Email, Password) {
    return axios.post("/AdminAccount/Login", {
      Email: Email,
      Password: Password
    });
  },
  registerUser(payload) {
    return axios.post("/AdminAccount/RegisterUser", {
      payload: payload
    });
  },
  refreshToken() {
    return axios.post("/refresh", {
      refreshToken: localStorage.getItem("refreshToken")
    });
  }
};
