<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="ID_Not_Found"
    >
      <span
        >company wallet record with id: {{ this.$route.params.Id }} not found.
      </span>
    </vs-alert>

    <div id="company-data" v-if="WalletBalance != undefined">
      <vx-card class="mb-base" id="account-info">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            class="m-4"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <h3 class="m-2">
              {{ $t("Balance") }}
            </h3>
            <h2 class="m-1" v-if="WalletBalance >= 0" style="color:green">
              {{ WalletBalance | numFormat("###,##0.00") }}
            </h2>
            <h2 class="m-1" v-if="WalletBalance < 0" style="color:red">
              {{ WalletBalance | numFormat("###,##0.00") }}
            </h2>
            <h5>
              {{ $t(userInfo.WalletCountryCode + "_Currency") }}
            </h5>
          </vs-col>
        </vs-row>

        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            class="m-2"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <div class="vx-row flex-wrap m-2">
              <div class="mb-2 mt-2">
                <vs-button
                  @click="checkPaymentGateway('SavedMethods')"
                  icon-pack="feather"
                  class="mr-4"
                  icon="icon-edit"
                  >{{ $t("savedpaymentmethodes") }}</vs-button
                >
              </div>

              <div class="mb-2 mt-2 ">
                <vs-button
                  @click="checkPaymentGateway('AddBalance')"
                  icon-pack="feather"
                  class="mr-4"
                  icon="icon-edit"
                  >{{ $t("AddBalance") }}</vs-button
                >
              </div>

              <div class="mb-2 mt-2 " v-if="AccountType != 'AT0'">
                <vs-button
                  icon-pack="feather"
                  :to="{
                    name: 'TransferBalance'
                  }"
                  class="mr-4"
                  icon="icon-edit"
                  >{{ $t("TransferBalance") }}</vs-button
                >
              </div>
              <div class="mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  :to="{
                    name: 'TransactionsHistory'
                  }"
                  class="mr-4"
                  icon="icon-edit"
                  >{{ $t("TransactionsHistory") }}</vs-button
                >
              </div>
            </div>
          </vs-col>
        </vs-row>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleUser from "@/store/user/moduleUser.js";

export default {
  data() {
    return {
      ID_Not_Found: false,
      WalletBalance: {},
      userInfo: {},
      WalletCountryCode: null,
      AccountType: null
    };
  },
  components: {},
  methods: {
    checkPaymentGateway(routeName) {
      var Obj = {};
      Obj.CountryCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode;

      this.$store
        .dispatch("User/GetCountryPaymentGatway", Obj)
        .then(response => {
          if (response.status == 200 && response.data.Error == "") {
            this.RouteToPage(routeName, response.data.PaymentGatway);
          }
        });
    },
    RouteToPage(routeName, PaymentGatwayName) {
      if (routeName == "SavedMethods") {
        switch (PaymentGatwayName) {
          case "weaccept":
            this.$router.push({ name: "SavedPayments" });
            break;
          case "braintree":
            this.$router.push({ name: "SavedPaymentMethods" });
            break;
          case "payfort":
            this.$router.push({ name: "home" });
            break;
        }
      }
      if (routeName == "AddBalance") {
        switch (PaymentGatwayName) {
          case "weaccept":
            this.$router.push({ name: "AddBalance" });
            break;
          case "braintree":
            this.$router.push({
              name: "Payment",
              params: { isAddBalance: true }
            });
            break;
          case "payfort":
            this.$router.push({ name: "home" });
            break;
        }
      }
    },
    Back() {
      this.$router.go(-1);
    },

    fetchData() {
      this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let JsonObj = {};
      JsonObj.PhoneNo = this.userInfo.PhoneNumber;
      this.$store
        .dispatch("User/GetUserBalance", JsonObj)
        .then(response => {
          if (response.status == 200) {
            this.WalletBalance = response.data.balance;
            this.$vs.loading.close();
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          this.ID_Not_Found = true;
          window.showError();
        });
    }
  },
  created() {
    if (!moduleUser.isRegistered) {
      this.$store.registerModule("User", moduleUser);
      moduleUser.isRegistered = true;
    }
    this.AccountType = JSON.parse(localStorage.getItem("userInfo")).AccountType;

    this.WalletCountryCode = JSON.parse(
      localStorage.getItem("userInfo")
    ).WalletCountryCode;
    this.fetchData();
  }
};
</script>
