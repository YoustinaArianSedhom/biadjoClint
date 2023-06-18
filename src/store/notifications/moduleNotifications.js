/*=========================================================================================
  File Name: moduleCountry.js
  Description: Country Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Notifications/pixinvent
==========================================================================================*/

import state from "./moduleNotificationsState.js";
import mutations from "./moduleNotificationsMutations.js";
import actions from "./moduleNotificationsActions.js";
import getters from "./moduleNotificationsGetters.js";

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
