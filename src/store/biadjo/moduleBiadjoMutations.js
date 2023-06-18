/*=========================================================================================
  File Name: moduleCalendarMutations.js
==========================================================================================*/

export default {
  SET_BiadjoS(state, Biadjo) {
    state.Biadjo = Biadjo;
  },
  Set_CancelationFees(state, CancelationFees) {
    state.CancelationFees = CancelationFees;
  },
  Update_CurrBS(state, CurrBS) {
    state.CurrBS = CurrBS;
  },
  StartLocationData(state, data) {
    state.StartLocationData = data;
  },
  EndLocationData(state, data) {
    state.EndLocationData = data;
  },
  StopPointLocationData(state, data) {
    state.StopPointLocationData = data;
  }
};
