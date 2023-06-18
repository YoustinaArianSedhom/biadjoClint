/*=========================================================================================
  File Name: moduleAuthState.js
==========================================================================================*/
export default {
  User: [],
  isUserLoggedIn: () => {
    return !!localStorage.getItem("userInfo");
  },
  isEmailExist: "",
  isRegisteredCompany: "",
  isForgetPasswordSent: ""
};
