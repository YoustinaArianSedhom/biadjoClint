/*=========================================================================================
  File Name: moduleCountry.js
  Description: Country Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/




import state from './moduleGeneralState.js'
import mutations from './moduleGeneralMutations.js'
import actions from './moduleGeneralActions.js'
import getters from './moduleGeneralGetters.js'

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
