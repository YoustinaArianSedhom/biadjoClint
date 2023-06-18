import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store.js";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/FollowBiadjoOnMap/:Id",
          name: "FollowBiadjoOnMap",
          component: () => import("@/views/biadjo/FollowBiadjoOnMap.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FollowOnMap", active: true }
            ],
            pageTitle: "FollowOnMap",
            rule: "Anonymous"
          }
        },
        {
          path: "/StartLocation",
          name: "StartLocation",
          component: () => import("@/views/googleMap/StartLocation.vue"),
          meta: {
            pageTitle: "StartLocation",
            rule: "Anonymous"
          }
        },
        {
          path: "/EndLocation",
          name: "EndLocation",
          component: () => import("@/views/googleMap/EndLocation.vue"),
          meta: {
            pageTitle: "EndLocation",
            rule: "Anonymous"
          }
        },

        {
          path: "/Payment",
          name: "Payment",
          component: () => import("@/views/Payments/Braintree/Payment.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Payment", active: true }
            ],
            pageTitle: "Payment",
            rule: "Anonymous"
          }
        },
        {
          path: "/SavedPaymentMethods",
          name: "SavedPaymentMethods",
          component: () =>
            import("@/views/Payments/Braintree/BraintreeSavedPayments.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "SavedPaymentMethods", active: true }
            ],
            pageTitle: "SavedPaymentMethods",
            rule: "Anonymous"
          }
        },
        {
          path: "/AddBalance",
          name: "AddBalance",
          component: () =>
            import("@/views/Payments/WeAccept/PaymentWeAcceptAddBalance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "AddBalance", active: true }
            ],
            pageTitle: "AddBalance",
            rule: "Anonymous"
          }
        },

        {
          path: "/CardCheckout",
          name: "CardCheckout",
          component: () =>
            import("@/views/Payments/WeAccept/WeAcceptPayByCard.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "PayByCard", active: true }
            ],
            pageTitle: "PayByCard",
            rule: "Anonymous"
          }
        },
        {
          path: "/SavedPayments",
          name: "SavedPayments",
          component: () =>
            import("@/views/Payments/WeAccept/WeAcceptSavedPayments.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "SavedPaymentMethods", active: true }
            ],
            pageTitle: "SavedPaymentMethods",
            rule: "Anonymous"
          }
        },
        {
          path: "/Selecting",
          name: "Selecting",
          component: () => import("@/views/biadjo/Selecting.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Selecting", active: true }
            ],
            pageTitle: "Selecting",
            rule: "Anonymous"
          }
        },
        {
          path: "/InProgress",
          name: "InProgress",
          component: () => import("@/views/biadjo/InProgress.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "InProgress", active: true }
            ],
            pageTitle: "InProgress",
            rule: "Anonymous"
          }
        },
        {
          path: "/History",
          name: "History",
          component: () => import("@/views/biadjo/History.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "History", active: true }
            ],
            pageTitle: "History",
            rule: "Anonymous"
          }
        },
        {
          path: "/RequestBiadjo",
          name: "RequestBiadjo",
          component: () =>
            import("@/views/biadjo/requestBiadjo/RequestBiadjo.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "RequestBiadjo", active: true }
            ],
            pageTitle: "RequestBiadjo",
            rule: "Anonymous"
          }
        },

        {
          path: "/user/UserPersonalDetails",
          name: "UserPersonalDetails",
          component: () => import("@/views/user/UserPersonalDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },

              { title: "UserPersonalDetails", active: true }
            ],
            rule: "Anonymous",
            pageTitle: "UserPersonalDetails"
          }
        },
        {
          path: "/ContactUs",
          name: "Contact-Us",
          component: () => import("@/views/generalForms/ContactUs.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "ContactUs", active: true }
            ],
            rule: "Anonymous",
            pageTitle: "ContactUs"
          }
        },
        {
          path: "/Wallet",
          name: "Wallet",
          component: () => import("@/views/Wallet/Wallet.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Wallet", active: true }
            ],
            pageTitle: "Wallet",
            rule: "Anonymous"
          }
        },
        {
          path: "/TransferBalance",
          name: "TransferBalance",
          component: () => import("@/views/Wallet/TransferBalance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Wallet" },
              { title: "TransferBalance", active: true }
            ],
            pageTitle: "TransferBalance",
            rule: "Anonymous"
          }
        },
        {
          path: "/TransactionsHistory",
          name: "TransactionsHistory",
          component: () => import("@/views/Wallet/TransactionsHistory.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              // {
              //   title: "Driver Profile"
              // },
              { title: "TransactionsHistory", active: true }
            ],
            pageTitle: "TransactionsHistory",
            rule: "Anonymous"
          }
        },
        {
          path: "/AddCompanyUser",
          name: "AddCompanyUser",
          component: () => import("@/views/company/AddCompanyUser.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "AddUser", active: true }
            ],
            pageTitle: "AddUser",
            rule: "Anonymous"
          }
        },
        {
          path: "/SwitchIndividualToCompany",
          name: "SwitchIndividualToCompany",
          component: () =>
            import("@/views/company/SwitchIndividualToCompany.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "SwitchIndividualToCompany", active: true }
            ],
            pageTitle: "SwitchIndividualToCompany",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyUsers",
          name: "CompanyUsers",
          component: () => import("@/views/company/CompanyUsers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyUsers", active: true }
            ],
            pageTitle: "CompanyUsers",
            rule: "Anonymous"
          }
        },

        {
          path: "/CompanyProfile",
          name: "CompanyProfile",
          component: () => import("@/views/company/CompanyProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyProfile", active: true }
            ],
            pageTitle: "CompanyProfile",
            rule: "Anonymous"
          }
        },
        {
          path: "/SelectingTrips",
          name: "SelectingTrips",
          component: () => import("@/views/company/SelectingTrips.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              // {
              //   title: "Driver Profile"
              // },
              { title: "SelectingTrips", active: true }
            ],
            pageTitle: "SelectingTrips",
            rule: "CompanyUser"
          }
        },
        {
          path: "/InProgressTrips",
          name: "InProgressTrips",
          component: () => import("@/views/company/InProgressTrips.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              // {
              //   title: "Driver Profile"
              // },
              { title: "InProgressTrips", active: true }
            ],
            pageTitle: "InProgressTrips",
            rule: "CompanyUser"
          }
        },
        {
          path: "/HistoryTrips",
          name: "HistoryTrips",
          component: () => import("@/views/company/HistoryTrips.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              // {
              //   title: "Driver Profile"
              // },
              { title: "HistoryTrips", active: true }
            ],
            pageTitle: "HistoryTrips",
            rule: "CompanyUser"
          }
        },
        {
          path: "/CompanyUserProfile/:PhoneNo",
          name: "CompanyUserProfile",
          component: () => import("@/views/company/CompanyUserProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyUserProfile", active: true }
            ],
            pageTitle: "CompanyUserProfile",
            rule: "Anonymous"
          }
        },
        {
          path: "/BiadjoDetails/:Id?",
          name: "BiadjoDetails",
          component: () => import("@/views/biadjo/BiadjoDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BiadjoDetails", active: true }
            ],
            pageTitle: "BiadjoDetails",
            rule: "Anonymous"
          }
        },
        {
          path: "/BiadjoOffers/:Id?",
          name: "BiadjoOffers",
          component: () => import("@/views/biadjo/BiadjoOffers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              // {
              //   title: "Biadjo Search",
              //   url: "/BiadjoSearch",
              //   active: true
              // },
              { title: "BiadjoOffers", active: true }
            ],
            pageTitle: "BiadjoOffers",
            rule: "Anonymous"
          }
        },
        {
          path: "/biadjo/PayByCard",
          name: "PayByCard",
          component: () => import("@/views/biadjo/PayByCard.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "PayByCard", active: true }
            ],
            pageTitle: "PayByCard",
            rule: "Anonymous"
          }
        }
      ]
    },

    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================

        // Redirect to 404 page, if no match found

        {
          path: "/pages/Error404",
          name: "Error404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/user/register/register",
          name: "user-register",
          component: () => import("@/views/user/register/Register.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/user/login/login",
          name: "user-login",
          component: () => import("@/views/user/login/Login.vue"),
          meta: {
            rule: "Anonymous",
            pageTitle: "Login"
          }
        },

        {
          path: "/user/forgetpassword/forgetpassword",
          name: "user-forgetpassword",
          component: () =>
            import("@/views/user/forgetPassword/forgetPassword.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/user/ResetPasswordByUser",
          name: "ResetPasswordByUser",
          component: () => import("@/views/user/ResetPasswordByUser.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/pages/not-authorized",
          name: "page-not-authorized",
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/Download",
          name: "Download",
          component: () => import("@/views/MobileView/DownloadOurAPP.vue"),
          meta: {
            rule: "Anonymous"
          }
        }
      ]
    },
    {
      path: "",
      component: () => import("@/layouts/main/CustomMain.vue"),
      children: [
        {
          path: "/TransactionStatus?id=:id&success=:success",
          name: "TransactionStatus",
          component: () =>
            import("@/views/Payments/WeAccept/TransactionStatus.vue"),
          meta: {
            rule: "Anonymous",
            pageTitle: "TransactionStatus"
          },
          props: true
        },
        {
          path: "/TransactionStatus",
          name: "TransactionStatus",
          component: () =>
            import("@/views/Payments/WeAccept/TransactionStatus.vue"),
          meta: {
            rule: "Anonymous",
            pageTitle: "TransactionStatus"
          }
        }
      ]
    },
    {
      path: "*",
      redirect: "/pages/Error404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});
const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/user/login/login",
    "/user/register/register",
    "/user/forgetPassword/forgetPassword",
    "/TransactionStatus"
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userInfo");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    store.commit("REMOVE_USER_STORE", null, { root: true });
    next("/user/login/login");
  } else {
    next();
  }
});

// });

export default router;
