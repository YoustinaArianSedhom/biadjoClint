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
  GetCountryPaymentGatway(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/General/GetCountryPaymentGatway", item)
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
  GetUserBalance(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/Users/GetUserBalance", item)
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
  GetTransactions(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/Users/TransactionsUsers", item)
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
  GetSavedPaymentMethods(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/WeAcceptPayment/WeAcceptSavedPaymentMethods", item)
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
  WeAcceptGetSavedPaymentMethods(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/WeAcceptPayment/CheckoutBiadjoCreditCard", item)
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
  PayBiadjoSavedPaymentMethods(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/WeAcceptPayment/PayBiadjoSavedPaymentMethods", item)
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
  GenerateTokenByWeAccept(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/WeAcceptPayment/CheckoutClientAddBalanceCreditCard", item)
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
  AddBalanceSavedPaymentMethods(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/WeAcceptPayment/AddBalanceSavedPaymentMethods", item)
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
  GetSavedPaymentMethodsWeAccept(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/WeAcceptPayment/WeAcceptSavedPaymentMethods", item)
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
  DeleteWeAcceptPaymentMethods(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/WeAcceptPayment/DeleteWeAcceptPaymentMethods", item)
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
  GenerateToken(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BrainTreePayments/GenerateToken", item)
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
  BraintreeDeleteSavedPaymentMethod(context, Obj) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BrainTreePayments/DeletePaymentMethod", Obj)
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
  BraintreeGetSavedPaymentMethods(context, Customer) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BrainTreePayments/GetSavedPaymentMethods", Customer)
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

  AddPaymentMethod(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/BrainTreePayments/AddPaymentMethod", item)
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
  addBalanceToUser(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BrainTreePayments/AddBalanceUser", Model)
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
  CheckoutBiadjoWallet(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Payments/CheckoutBiadjoWallet", Biadjo)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  CheckoutBiadjoCreditCard(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BrainTreePayments/CheckoutBiadjoCreditCard", Biadjo)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
