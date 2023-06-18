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
  BiadjoSchedualeForWeek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientDashboard/BiadjoSchedualeForWeek", item)
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

  BiadjoSchedualePerStatusForToday(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientDashboard/BiadjoSchedualePerStatusForToday", item)
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
