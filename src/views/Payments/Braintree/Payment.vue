<template>
  <div>
    <vx-card>
      <!-- Add Balance Method -->
      <div v-if="isAddBalance">
        <!-- do not refresh note -->
        <vs-row
          v-if="ShowWarningMsg"
          vs-type="flex"
          vs-justify="center"
          class="mb-4"
        >
          <span class="text-danger text-lg">{{ $t("BalanceNote") }}</span>
        </vs-row>
        <!-- redirectnote-->
        <vs-row
          v-if="ShowRedirectMsg"
          vs-type="flex"
          vs-justify="center"
          class="mb-4"
        >
          <span class="text-danger text-lg">{{ $t("RedirectNote") }}</span>
        </vs-row>
        <!-- Balance Input Dev-->
        <div v-if="showBalanceinputDev">
          <!-- Balance Input -->
          <vs-row vs-type="flex" vs-justify="center">
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="12"
            >
              <vx-input-group>
                <vs-input
                  type="number"
                  min="10"
                  @input="NotValidAmount"
                  v-model="PaymentModel.Amount"
                />
                <template slot="append">
                  <div class="append-text btn-addon">
                    <vs-button color="success" type="filled" :disabled="true">
                      {{ $t(userInfo.countrycode + "_Currency") }}
                    </vs-button>
                  </div>
                </template>
              </vx-input-group>
            </vs-col>
            <span v-if="showAmountNote" class="text-warning mb-4 mt-4">{{
              $t("NotValidAmount")
            }}</span>
          </vs-row>
          <!-- Add Balance Button -->
          <vs-row vs-type="flex" vs-justify="center">
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="12"
            >
              <div class="vx-row flex-wrap m-4">
                <vs-button
                  :disabled="PaymentModel.Amount == '' || showAmountNote"
                  @click="generateToken"
                  class="mr-2 p-4"
                  >{{ $t("AddBalance") }}</vs-button
                >
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="mr-2 p-4"
                >
                  {{ $t("Back") }}</vs-button
                >
              </div>
            </vs-col>
          </vs-row>
        </div>
      </div>
      <!-- Add Payment Method -->
      <div v-show="showPayment">
        <div id="dropin-container" :dir="$vs.rtl ? 'ltr' : 'ltr'"></div>
      </div>
      <!-- Add Payment Method //// Add Balance Button -->
      <vs-row vs-type="flex" class="justify-center mt-2">
        <vs-button v-show="showAddButton" id="submit-button">
          {{ $t("PaymentSubmit") }}
        </vs-button>

        <vs-button
          v-show="showAddButton"
          type="border"
          color="warning"
          icon-pack="feather"
          @click="Back"
          class="ml-4"
        >
          {{ $t("Back") }}</vs-button
        >
      </vs-row>

      <!-- payment result -->
      <vs-row v-if="PaymentDone" vs-type="flex">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div class="flex flex-wrap m-4">
            <img
              style="padding:4px;min-width:40px;text-align: center;"
              width="70px"
              height="77px"
              :src="StatusImage"
            />
            <span class="mt-8 m-2"> {{ $t(Msg) }}</span>
          </div>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="12"
          v-if="ResponseModel.RecieptID"
        >
          <div class="flex flex-wrap m-4">
            <h3>{{ $t("RecieptNo") }}: {{ ResponseModel.RecieptID }}</h3>
          </div>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="12"
          v-if="ResponseModel.TransactionId"
        >
          <div class="flex flex-wrap m-4">
            <h3>
              {{ $t("TransactionNumber") }}: {{ ResponseModel.TransactionId }}
            </h3>
          </div>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="12"
          v-if="ResponseModel.Result"
        >
          <div class="flex flex-wrap m-4">
            <h3>{{ ResponseModel.Result }}</h3>
          </div>
        </vs-col>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
import dropIn from "braintree-web-drop-in";
/* eslint-disable */
import moduleUser from "@/store/user/moduleUser.js";
import axios from "axios";
export default {
  data() {
    return {
      showAmountNote: false,
      showPayment: false,
      isAddBalance: false,
      config: {
        authorization: "",
        container: "#dropin-container",
        vaultManager: true,
        styles: {
          direction: "ltr"
        },
        venmo: false,
        // threeDSecure: {
        //   amount: {}
        // },
        card: {
          vault: {
            allowVaultCardOverride: false,
            vaultCard: true
          },
          cardholderName: {
            required: true
          }
        }
      },
      showAddButton: false,
      showBalanceinputDev: false,
      PaymentModel: {
        Amount: "",
        UserId: "",
        PaymentMethodNonce: null
      },
      userInfo: null,
      PaymentDone: false,
      Msg: null,
      ShowRedirectMsg: false,
      ShowWarningMsg: true,

      ShowFailed: false,
      ShowSuccess: false,
      AddPaymentMethod: false,
      StatusImage: null,
      hidden: false,
      hiddenAddBalance: false,

      ResponseModel: {},
      ErrorMsg: false,
      timer: 3,
      authorization: null,
      instance: null,
      nonce: null
    };
  },

  methods: {
    Back() {
      this.$router.go(-1);
    },
    NotValidAmount() {
      if (this.PaymentModel.Amount.includes(".")) {
        if (this.PaymentModel.Amount.split(".")[1].length > 2) {
          this.showAmountNote = true;
        } else {
          this.showAmountNote = false;
        }
      }
    },
    generateToken() {
      if (this.isAddBalance) {
        this.showBalanceinputDev = false;
        this.config.threeDSecure = {};
        this.config.threeDSecure.amount = this.PaymentModel.Amount;
      }
      this.$vs.loading();
      let JsonObj = {};
      JsonObj.UserID = this.userInfo.Id;
      JsonObj.UserType = "client";

      this.$store.dispatch("User/GenerateToken", JsonObj).then(response => {
        if (response.status == 200) {
          this.authorization = response.data.ClientToken;
          this.config.authorization = this.authorization;
          dropIn.create(this.config, (createErr, instance) => {
            this.instance = instance;
            this.showPayment = true;
            this.showAddButton = true;
            this.$vs.loading.close();
          });
          var button = document.getElementById("submit-button");
          button.addEventListener("click", () => {
            this.$vs.loading();

            this.instance.requestPaymentMethod((err, payload) => {
              if (payload) {
                this.$vs.loading.close();
                this.PaymentModel.PaymentMethodNonce = payload.nonce;
                if (this.isAddBalance) {
                  this.PayWithSelectedMethod();
                }
              }
              if (err) {
                this.$vs.loading.close();
                console.log(err);
              }
            });
          });
        }
      });
    },
    PayWithSelectedMethod() {
      this.$vs.loading();

      this.$store
        .dispatch("User/addBalanceToUser", this.PaymentModel)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            if (response.data.Result.includes("Success")) {
              this.Msg = "Success";
              this.PaymentDone = true;
              this.StatusImage = require("@/assets/images/ClientAssets/_checked.png");
              this.ResponseModel = response.data;
              this.ShowWarningMsg = false;
              this.ShowRedirectMsg = true;
              this.showAddButton = false;
              this.showPayment = false;

              setTimeout(() => {
                this.$router.push({ name: "Wallet" });
              }, 8000);
            }
          }
        })
        .catch(error => {
          this.$vs.loading.close();
          if (error.status == 400) {
            this.Msg = "Failed";
            this.PaymentDone = true;
            this.StatusImage = require("@/assets/images/ClientAssets/_cancel.png");
            this.ResponseModel = error.data;
            this.ShowWarningMsg = false;
            this.ShowRedirectMsg = true;
            this.showAddButton = false;
            this.showPayment = false;

            setTimeout(() => {
              this.$router.push({ name: "Wallet" });
            }, 8000);
          }
        });
    }
  },
  created() {
    if (!moduleUser.isRegistered) {
      this.$store.registerModule("User", moduleUser);
      moduleUser.isRegistered = true;
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.PaymentModel.UserId = this.userInfo.Id;
    let JsonObj = {};
    JsonObj.CustomerID = this.userInfo.CustomerId;
    if (this.$route.params.isAddBalance == undefined) {
      this.Back();
    }
    this.isAddBalance = this.$route.params.isAddBalance;

    if (!this.isAddBalance) {
      this.generateToken();
    } else {
      this.showBalanceinputDev = true;
    }
  }
};
</script>
