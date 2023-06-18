import axios from "@/axios.js";

export default {
  SelectingTripsUsers(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserBiadjo/SelectingTripsUsers", Biadjo)
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
  GetDriverById(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/GetDriverDetails", driver)
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
  InProgressTripsUsers(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserBiadjo/InProgressTripsUsers", Biadjo)
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
  HistoryTripsUsers(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserBiadjo/HistoryTripsUsers", Biadjo)
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
  BiadjoRequest(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BiadjoRealTime/BiadjoRequest", Biadjo)
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
  ResendBiadjoRequest(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BiadjoRealTime/ResendBiadjoRequest", Biadjo)
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
  GetInsuranceValue(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/BiadjoRealTime/GetInsuranceValue", Biadjo)
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
  GetBiadjoByid(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/BiadjoDetails", Biadjo)
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
  UpdateBiadjoStatus(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/UpdateBiadjoStatus", Biadjo)
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
  GetOffers(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserBiadjo/GetOffers", Biadjo)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  CheckIfDriverHasAnotherBiadjo(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/CheckIfDriverHasAnotherBiadjo", Model)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  CloseBiadjoByClient(context, rate) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/CloseBiadjoByClient", rate)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
