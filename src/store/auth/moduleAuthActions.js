/*=========================================================================================
  File Name: moduleAuthActions.js
==========================================================================================*/

import jwt from "../../http/requests/auth/jwt/index.js";

import axios from "@/axios.js";
import router from "@/router";

export default {
  fetchAccessToken() {
    return new Promise(resolve => {
      jwt
        .RefreshToken()
        .then(response => {
          resolve(response);
        })
        .catch(function() {
          router.push("/pages/login");
        });
    });
  },
  logout({ commit }) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("TokenExpiration");
    localStorage.removeItem("userInfo");
    commit("CLEAR_USER_INFO", null, { root: true });
    commit("REMOVE_USER_STORE", null, { root: true });
    commit("REMOVE_BEARER");
    router.push("/user/login/login");
  },
  getDriverLocation(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/GetDriverLocation", Driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  CheckPhoneNoExist(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/CheckPhoneNoExist", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  loginJWT({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserToken/CreateTokenUser", user)
        .then(response => {
          if (response.status == 200 && response.data.Error == "") {
            localStorage.setItem(
              "TokenExpiration",
              response.data.TokenExpiration
            );
            localStorage.setItem("AccessToken", response.data.AccessToken);
            localStorage.setItem("RefreshToken", response.data.RefreshToken);

            commit("UPDATE_USER_INFO", response.data, { root: true });

            commit("SET_BEARER", response.data.AccessToken);
            resolve(response);
          } else {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchUserDetails({ commit }, phone) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/GetUserDetails", phone)
        .then(response => {
          commit("UPDATE_USER_INFO", response.data, { root: true });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  SendOTPToUser(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/SendOTP", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  UpdateFCMToken(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/NewFCMToken", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  RegisterUser(commit, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/RegisterUser", user)
        .then(response => {
          if (response.status == 200) {
            if (response.data != "-1" && response.data != "0") {
              // Redirect User
              // Update data in localStorage
              //localStorage.setItem("AccessToken", response.data.AccessToken);
              //localStorage.setItem("RefreshToken", response.data.RefreshToken);
              //commit("UPDATE_USER_INFO", response.data, { root: true });
              // router.push(router.currentRoute.query.to || "/");
            }
          }

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  ForgotPassword({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/ResetPassword", item)
        .then(response => {
          if (response.status == 200) {
            commit(
              "SET_IS_FORGETPASSWORD_EMAILSENT_SSUCCESSFUL",
              response.data.result
            );
            resolve(response);
          }
          // Redirect User
          //router.push(router.currentRoute.query.to || '/')
        })
        .catch(error => {
          commit("SET_IS_FORGETPASSWORD_EMAILSENT_SSUCCESSFUL", "false");
          reject(error);
        });
    });
  },
  fetchUserDetailsList(context, user) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/Users/GetUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  changePhoneNo(context, user) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/Users/ChangePhoneNo", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateEmail(context, user) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/Users/UpdateEmail", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  refreshCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      var JsonValue = {};
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo != null) {
        JsonValue.PhoneNo = userInfo.PhoneNumber;
        axios
          .post("/Users/GetUserDetails", JsonValue)
          .then(response => {
            if (response.status == 200) {
              commit("UPDATE_USER_INFO", response.data, { root: true });
              resolve(response);
            }
          })
          .catch(function(error) {
            reject(error);
          });
      }
    });
  },
  registerCompany(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/RegisterCompany", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
