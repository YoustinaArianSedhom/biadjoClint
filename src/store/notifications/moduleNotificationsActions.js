/*=========================================================================================
  File Name: moduleCourseClassActions.js
  Description: CourseClass Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from "@/axios.js";
export default {
  getNotificationsList({ commit }, User) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/GetUserNotifications", User)
        .then(response => {
          commit("UserNotifications", response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  UpdateNotificationStatus(context, User) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/UpdateNotificationStatus", User)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  DeleteUserNotifications(context, CurrentNotification) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Users/DeleteUserNotifications", CurrentNotification)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
