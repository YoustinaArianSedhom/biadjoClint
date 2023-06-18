/*=========================================================================================
  File Name: moduleCourseClassActions.js
  Description: CourseClass Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from "@/axios.js";
import Servers from "@/http/axios/Servers.json";

export default {
  fetchAllCountriesList({ commit }) {
    axios.defaults.baseURL = Servers.EG_Server;
    return new Promise((resolve, reject) => {
      axios
        .get("/General/GetCountryList")
        .then(response => {
          commit("SET_COUNTRY", response.data);
          // resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  SuppoertPhoneNumber(context, Obj) {
    return new Promise((resolve, reject) => {
      axios
        .post("/General/SuppoertPhoneNumber", Obj)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  ContactUs(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/General/ContactUs", item)
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
  GetStateList({ commit }) {
    let item = {};
    debugger;
    item.CountryCode = "EG";
    return new Promise((resolve, reject) => {
      axios
        .post("/General/GetStateList", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
            commit("SET_State", response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetCityList({ commit }, item) {
    debugger;
    return new Promise((resolve, reject) => {
      axios
        .post("/General/GetCityList", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
            commit("SET_City", response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
