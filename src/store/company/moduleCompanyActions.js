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
  CheckPhoneNoExist(context, item) {
    //debugger
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/CheckPhoneNoExist", item)
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

  SendOTPToUser(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/SendOTP", driver)
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

  AddUserToCompany(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/AddUserToCompany", user)
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
  TransferBalanceToUser(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/TransferBalance", user)
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
  GetCompanyUsers(context, company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/GetCompanyUsers", company)
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

  fetchCompanyDetails(context, item) {
    //debugger
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/ClientCompanyAccount/GetCompanyDetails", item)
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
  UploadCompanyLogo(context, image) {
    const formData = new FormData();
    // var jsonObject = image.params.Id;
    formData.append("jsonObject", JSON.stringify(image[Object.keys(image)[0]]));
    formData.append("file", image.params.file, image.params.file.name);

    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/UploadCompanyLogo", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
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

  UpdateAccountFromCompany(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/UpdateUserAccountStatus", user)
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
  ChangeUserAccountToCompany(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/ChangeUserAccountToCompany", user)
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
  UpdateUserAccountType(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ClientCompanyAccount/UpdateUserAccountType", user)
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

  InProgressTripsCompany(context, item) {
    //debugger
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/ClientCompanyAccount/InProgressTripsCompany", item)
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

  SelectingTripsUsers(context, item) {
    //debugger
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/ClientCompanyAccount/SelectingTripsUsers", item)
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

  HistoryTripsCompany(context, item) {
    //debugger
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/ClientCompanyAccount/HistoryTripsCompany", item)
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
