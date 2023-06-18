/*=========================================================================================
  File Name: moduleCountry.js
  Description: Country Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/




import state from './moduleCompanyState.js'
import mutations from './moduleCompanyMutations.js'
import actions from './moduleCompanyActions.js'
import getters from './moduleCompanyGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
