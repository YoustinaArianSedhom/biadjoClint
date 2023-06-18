<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
import jwt from "@/http/requests/auth/jwt/index.js";
import firebase from "firebase/app";
import "firebase/messaging";
// import signalR from "@/views/googleMap/signalR.js";
export default {
  data() {
    return {
      CurrentStatus: null,
      connection: null
    };
  },
  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    }
  },
  methods: {
    FcmStart() {
      var config = {
        apiKey: "AIzaSyDVxcAS9EWP-Pc8Pu0Bi84WtHFZu7PePVk",
        authDomain: "biadjo-1546341863949.firebaseapp.com",
        databaseURL: "https://biadjo-1546341863949.firebaseio.com",
        projectId: "biadjo-1546341863949",
        storageBucket: "biadjo-1546341863949.appspot.com",
        messagingSenderId: "1058566822933",
        appId: "1:1058566822933:web:d0cc8695c063c7363d421c",
        measurementId: "G-9B0EZQSYLT"
      };
      firebase.initializeApp(config);

      var messaging = firebase.messaging();

      messaging.usePublicVapidKey(
        "BHifL1PykXA3YBKzKJQERNau4OdyXP2Xj1Sarqqs2Kl5q4z9lcUK7n0EsTxknRkx8gtylQqKAJFGQIrv4PD_jK4"
      );

      messaging
        .requestPermission()
        .then(() => {
          messaging.getToken().then(token => {
            messaging.onMessage(
              payload => {
                switch (payload.data.controller) {
                  case "logout":
                    this.$store.dispatch("auth/logout");

                    break;
                  case "reset":
                    location.reload("/");

                    break;

                  // case "changeCountry":
                  //   break;
                  case "GoTo":
                    this.$router.push({ name: payload.data.routeName });

                    break;
                }
                if (!payload.data.controller) {
                  this.$store.commit("UPDATE_NotificationList", payload);
                }
              },
              e => {
                console.log(e);
              }
            );
            this.saveNotificationToken(token);
          });
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    saveNotificationToken(token) {
      var Obj = {};
      Obj.NewToken = token;
      // Obj.UserId = this.$store.state.AppActiveUser.Id;
      Obj.PhoneNo = this.$store.state.AppActiveUser.PhoneNumber;

      this.$store.dispatch("auth/UpdateFCMToken", Obj).then(() => {
        this.$store.dispatch("auth/refreshCurrentUser");
      });
    },
    /* eslint-disable */
    checkAndAttachMapScriptGoogleMaps(callback) {
      if (!!window.google) {
        // If you're using vue cli, then directly checking
        // 'google' obj will throw an error at the time of transpiling.
        callback();
        return true;
      }
      window.mapApiInitialized = callback;
      let script = document.createElement("script");
      let language = this.$i18n.locale;
      let region = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode.toUpperCase();
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&hl=ar&libraries=places,geometry&language=${language}
      &region=${region}&callback=mapApiInitialized`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    },

    checkAndAttachMapScript() {
      let initialized = !!window.google;
      return new Promise(async (resolve, reject) => {
        if (initialized) {
          return resolve(window.google);
        }

        initialized = true;
        window.mapApiInitialized = () => resolve(window.google);
        let language = await this.$i18n.locale;
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&libraries=places,geometry&language=${language}&callback=mapApiInitialized`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          resolve(window.google);
        };
        // script.onerror = () => reject(new Error("Script load error: " + src));
        document.body.appendChild(script);
      });
    },
    /* eslint-enable */
    showSuccessfulregistration() {
      this.$vs.notify({
        text: "Successful registration..",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "#27ABBE"
      });
    },
    showFillData() {
      this.$vs.notify({
        color: "red",
        position: "right-bottom",
        text: "Please fill all required data..."
      });
    },
    showNoRightAccessToLogin() {
      this.$vs.notify({
        color: "#EA5455",
        position: "bottom-center",
        text: this.$t("AccessDenied")
      });
    },
    showError() {
      this.$vs.notify({
        color: "#EA5455",
        position: "right-bottom",
        text: this.$t("showError")
      });
    },
    showSuccessCreate() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        text: this.$t("RegisterCreatedSuccessfuly")
      });
    },
    showSuccessContactUs() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        text: this.$t("ContactUsMessageSentSuccessfully")
      });
    },
    showUserAddeddSuccessfuly() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        text: this.$t("UserAddeddSuccessfuly")
      });
    },
    UserNotFound() {
      this.$vs.notify({
        color: "warning",
        position: "top-center",
        text: this.$t("ThisUserNotFound")
      });
    },
    IncorrectCode() {
      this.$vs.notify({
        color: "warning",
        position: "top-center",
        text: this.$t("IncorrectCode")
      });
    },
    showAlreadyExist() {
      this.$vs.notify({
        color: "warning",
        position: "bottom-center",
        text: this.$t("ThisUserAlreadyExist")
      });
    },
    showAddDriverToBiadjoSuccess() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("Assign")
      });
    },
    showSuccessfulyAssignedToDriver() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("Assign")
      });
    },
    showSuccess() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("showUpdate")
      });
    },
    ErrorData() {
      this.$vs.notify({
        color: "danger",
        position: "bottom-center",
        text: this.$t("PleaseEnterAllData")
      });
    },
    showSuccessRemoveUser() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        text: this.$t("showRemove")
      });
    },
    showNoRecords() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "bottom-center",
        text: this.$t("showNoDataAvailable")
      });
    },
    showBalanceTransfered() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("BalanceTransfered")
      });
    },
    showPleaseSelectCountry() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        text: this.$t("PleaseSelectCountry")
      });
    },
    showCheckEmail() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        text: this.$t("showCheckEmail")
      });
    },
    showPasswordChanged() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        text: this.$t("showPasswordChanged")
      });
    },
    userTypeNotAllowedToAccessCurrentPage(UserType) {
      if (UserType == "FAT2") {
        this.$router.go(-1);
      }
    },
    isUserAllowedToCheckOutByWallet(offer) {
      if (offer == undefined) {
        this.$router.push("/");
      }
    },
    isUserAllowedToCheckOutByCard(offer) {
      if (offer == undefined) {
        this.$router.push("/");
      }
    },
    AllowToAccessCurrentBiadjo(ClientCompanyID, UserId) {
      if (
        ClientCompanyID != 0 &&
        ClientCompanyID !=
          JSON.parse(localStorage.getItem("userInfo")).CompanyId &&
        JSON.parse(localStorage.getItem("userInfo")).AccountType == "AT0"
      ) {
        this.$router.push("/pages/Error404");
      } else if (UserId != JSON.parse(localStorage.getItem("userInfo")).Id) {
        this.$router.push("/pages/Error404");
      }
    },
    isUserAllowedToRegist(PhoneNo, CountryCode, Country) {
      if (
        PhoneNo == "" ||
        PhoneNo == undefined ||
        CountryCode == "" ||
        CountryCode == undefined ||
        Country == "" ||
        Country == undefined
      ) {
        this.$router.push({ name: "user-login" });
      }
    },

    isUserAllowedToResetPassword(PhoneNo) {
      if (PhoneNo == "" || PhoneNo == undefined) {
        this.$router.push({ name: "user-login" });
      }
    },
    toggleClassInBody(className) {
      if (className == "dark") {
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
        document.body.classList.add("theme-dark");
      } else if (className == "semi-dark") {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
      }
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
    if (this.$store.state.auth.isUserLoggedIn()) {
      if (Notification.permission === "granted") {
        this.FcmStart();
      }
      if (Notification.permission === "default") {
        // If it's okay let's create a notification
        this.$vs.dialog({
          type: "confirm",
          color: "primary",
          title: this.$t("Notification"),
          text: this.$t("PleaseAllowNotification"),
          accept: this.FcmStart,
          cancel: this.FcmStart,
          cancelText: this.$t("Cancel"),
          acceptText: this.$t("Save")
        });
      }
      // if (Notification.permission === "denied") {
      //   // If it's okay let's create a notification
      //   this.$vs.notify({
      //     title: this.$t("Notification"),
      //     text: this.$t("PleaseAllowNotification"),
      //     color: "warning",
      //     position: "top-center",
      //     iconPack: "feather",
      //     icon: "icon-bell"
      //   });
      // }
    }
  },
  async created() {
    // signalR.ConnectsignalR();
    jwt.init();
    if (this.$store.state.auth.isUserLoggedIn()) {
      this.$store
        .dispatch("auth/refreshCurrentUser")
        .then(response => {
          if (response.data.AccountStatus == "AS1") {
            this.$acl.change(response.data.AccountType);
          }
          if (response.data.AccountStatus != "AS1") {
            this.$store.commit("CLEAR_USER_INFO", null, { root: true });
            this.$store.commit("REMOVE_USER_STORE", null, { root: true });
            this.$store.dispatch("auth/logout");
          }
        })
        .catch(() => {
          this.$store.commit("CLEAR_USER_INFO", null, { root: true });
          this.$store.commit("REMOVE_USER_STORE", null, { root: true });
          this.$store.dispatch("auth/logout");
        });
    }

    if (localStorage.getItem("SaveLang") === "ar") {
      this.$vs.rtl = true;
    }

    window.showError = this.showError;
    window.showFillData = this.showFillData;
    window.showSuccess = this.showSuccess;
    window.showAddDriverToBiadjoSuccess = this.showAddDriverToBiadjoSuccess;
    window.showNoRecords = this.showNoRecords;
    window.showCheckEmail = this.showCheckEmail;
    window.showPasswordChanged = this.showPasswordChanged;
    window.userTypeNotAllowedToAccessCurrentPage = this.userTypeNotAllowedToAccessCurrentPage;
    window.isUserAllowedToRegist = this.isUserAllowedToRegist;
    window.isUserAllowedToCheckOutByWallet = this.isUserAllowedToCheckOutByWallet;
    window.isUserAllowedToCheckOutByCard = this.isUserAllowedToCheckOutByCard;
    window.AllowToAccessCurrentBiadjo = this.AllowToAccessCurrentBiadjo;
    window.isUserAllowedToResetPassword = this.isUserAllowedToResetPassword;
    window.showSuccessCreate = this.showSuccessCreate;
    window.showAlreadyExist = this.showAlreadyExist;
    window.UserNotFound = this.UserNotFound;
    window.IncorrectCode = this.IncorrectCode;
    window.showSuccessfuly = this.showSuccessfuly;
    window.showNoRightAccessToLogin = this.showNoRightAccessToLogin;
    window.showSuccessfulregistration = this.showSuccessfulregistration;
    window.showSuccessfulyAssignedToDriver = this.showSuccessfulyAssignedToDriver;
    window.showUserAddeddSuccessfuly = this.showUserAddeddSuccessfuly;
    window.checkAndAttachMapScript = this.checkAndAttachMapScript;
    window.checkAndAttachMapScriptGoogleMaps = this.checkAndAttachMapScriptGoogleMaps;
    window.showSuccessContactUs = this.showSuccessContactUs;
    window.showSuccessRemoveUser = this.showSuccessRemoveUser;
    window.showBalanceTransfered = this.showBalanceTransfered;
    window.showPleaseSelectCountry = this.showPleaseSelectCountry;
    window.ErrorData = this.ErrorData;

    let dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.error(e);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
#loading-bg {
  width: 100%;
  height: 100%;
  background: #fff;
  display: block;
  position: absolute;
}

.loading-logo {
  position: absolute;
  left: calc(50% - 45px);
  top: 35%;
}

.loading {
  position: absolute;
  left: calc(50% - 35px);
  top: 50%;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid transparent;
}

.loading .effect-1,
.loading .effect-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effect-1 {
  animation: rotate 1s ease infinite;
}

.loading .effect-2 {
  animation: rotateOpacity 1s ease infinite 0.1s;
}

.loading .effect-3 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  -webkit-animation: rotateOpacity 1s ease infinite 0.2s;
  animation: rotateOpacity 1s ease infinite 0.2s;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effects {
  transition: all 0.3s ease;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes rotateOpacity {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 0.1;
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
    opacity: 1;
  }
}
</style>
