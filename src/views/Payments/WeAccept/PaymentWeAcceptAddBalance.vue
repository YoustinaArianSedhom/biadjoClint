<template>
  <div>
    <vx-card style="padding:0px !important">
      <!-- Add Balance Method -->
      <div v-show="ShowBalancePart">
        <vs-row
          v-if="ShowWarningMsg"
          vs-type="flex"
          vs-justify="center"
          class="mb-4"
        >
          <span class="text-danger text-sm">{{ $t("BalanceNote") }}</span>
        </vs-row>

        <!-- Balance Input Dev-->
        <div>
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
                  @click="checkSavedPayment"
                  class="mr-2 p-4"
                  >{{ $t("AddBalance") }}</vs-button
                >
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="ml-2 p-4"
                >
                  {{ $t("Back") }}</vs-button
                >
              </div>
            </vs-col>
          </vs-row>
        </div>
      </div>

      <div v-if="IsTrue">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
            class="mb-4 mt-4"
          >
            <span class="text-2xl"> {{ $t("Amount") }} : </span>
            <span class="text-primary text-2xl">
              {{ PaymentModel.Amount | numFormat("###,##0.00") }}
              {{ $t(userInfo.countrycode + "_Currency") }}
            </span>
          </vs-col>
        </vs-row>
        <!-- list of cards -->
        <div v-if="ShowPaywithExistingCard == 'false'">
          <div class="m-2" v-for="(item, index) in ListOfCards" :key="index">
            <vx-card class="p-0">
              <div class="flex justify-between text-center">
                <div class="flex items-center">
                  <vs-radio
                    v-model="item.checked"
                    vs-value="false"
                    class="m-1"
                    @change="selectThisCard(item)"
                    vs-name="PaywithExistingCard"
                  ></vs-radio>
                  <img
                    :src="getCardPicture(item.CardSubtype)"
                    class="FixedHeightAndWidth"
                  />
                  <p class="ml-2 text-md self-center">
                    {{ item.MaskedPan }}
                  </p>
                </div>
              </div>
            </vx-card>
          </div>
          <div class="m-2">
            <vx-card class="p-0">
              <div class="flex justify-between text-center">
                <div class="flex items-center ">
                  <vs-radio
                    v-model="PaywithExistingCard"
                    vs-value="true"
                    class="m-1"
                    vs-name="PaywithExistingCard"
                  ></vs-radio>
                  <img :src="AddNewCardImg" class="FixedHeightAndWidth" />
                  <p class="ml-2 mr-2 text-md align-middle self-center">
                    {{ $t("AddNewCard") }}
                  </p>
                </div>
              </div>
            </vx-card>
          </div>
        </div>
        <!-- New Payment Method -->
        <div
          class="text-primary text-center align-middle self-center"
          v-if="ShowPaywithExistingCard == 'true' && token != null"
        >
          <div>
            <iframe
              style="border:none;height:520px"
              :src="
                `https://accept.paymobsolutions.com/api/acceptance/iframes/64493?payment_token=${token}`
              "
              class="w-full pt-10"
            ></iframe>
          </div>
          <span
            style="cursor: pointer;"
            @click="ShowPaywithExistingCard = 'false'"
            class="text-primary text-center align-middle self-center"
          >
            {{ $t("orPaywithexistingCard") }}
          </span>
        </div>
        <!-- button continue -->

        <div
          v-if="ShowPaywithExistingCard == 'false'"
          class="align-middle mb-2 mt-2 "
        >
          <vs-row vs-type="flex" class="justify-center mt-2">
            <vs-button class="mr-4 p-4" @click="ContinueButton">{{
              $t("Continue")
            }}</vs-button>
            <vs-button
              type="border"
              color="warning"
              icon-pack="feather"
              @click="Back"
              class="ml-4 p-4"
            >
              {{ $t("Back") }}</vs-button
            >
          </vs-row>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import moduleUser from "@/store/user/moduleUser.js";
export default {
  data() {
    return {
      Selectedcard: {},
      showAmountNote: false,
      AddNewCardImg: require("@/assets/images/ClientAssets/bt_ic_vaulted_unknown.png"),
      token: null,
      IsTrue: false,
      ShowPaywithExistingCard: "false",
      PaymentModel: {
        Amount: "",
        UserId: ""
      },
      userInfo: null,
      Msg: null,
      ShowWarningMsg: true,
      ShowBalancePart: true,
      ListOfCards: [],
      StatusImage: null,
      PaywithExistingCard: "false",
      ResponseModel: {}
    };
  },

  methods: {
    getCardPicture(CardSubtype) {
      switch (CardSubtype.toLowerCase()) {
        case "visa":
          return require("@/assets/images/ClientAssets/bt_ic_vaulted_visa.png");

        case "mastercard":
          return require("@/assets/images/ClientAssets/bt_ic_vaulted_mastercard.png");

        default:
          return "";
      }
    },
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
    selectThisCard(item) {
      this.PaywithExistingCard = item.checked;

      if (item != null) {
        this.Selectedcard = item;
      }
    },
    ContinueButton() {
      if (this.PaywithExistingCard == "false") {
        this.AddBalanceSavedPaymentMethods();
      } else {
        this.ShowPaywithExistingCard = "true";
        this.GenerateToken();
      }
    },

    AddBalanceSavedPaymentMethods() {
      this.$vs.loading();
      let Obj = {};
      Obj.Card_Token = this.Selectedcard.Token;
      Obj.UserId = this.userInfo.Id;
      Obj.Amount = this.PaymentModel.Amount;
      this.$store
        .dispatch("User/AddBalanceSavedPaymentMethods", Obj)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.location = response.data.redirection_url;
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    checkSavedPayment() {
      //close add balance part
      this.ShowBalancePart = false;
      this.$vs.loading();
      let Obj = {};
      Obj.UserId = this.userInfo.Id;

      this.ListOfCards = [];
      this.$store
        .dispatch("User/GetSavedPaymentMethods", Obj)
        .then(response => {
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.PaywithExistingCard = "true";
              this.ListOfCards = response.data;
              for (let i = 0; i < this.ListOfCards.length; i++) {
                this.ListOfCards[i].checked = false;
              }
              this.ShowPaywithExistingCard = "false";
              this.$vs.loading.close();
              this.IsTrue = true;
            } else {
              this.$vs.loading.close();
              this.ShowPaywithExistingCard = "true";
              this.PaywithExistingCard = "true";
              this.GenerateToken();
            }
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    GenerateToken() {
      let JsonObj = {};
      JsonObj.UserId = this.userInfo.Id;
      JsonObj.Amount = this.PaymentModel.Amount;

      this.$store
        .dispatch("User/GenerateTokenByWeAccept", JsonObj)
        .then(async response => {
          // if (response.status == 200) {
          this.$vs.loading.close();
          this.token = await response.data;
          this.IsTrue = true;
          // }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
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
              this.StatusImage = require("@/assets/images/ClientAssets/_checked.png");
              this.ResponseModel = response.data;
              this.ShowWarningMsg = false;

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
            this.StatusImage = require("@/assets/images/ClientAssets/_cancel.png");
            this.ResponseModel = error.data;
            this.ShowWarningMsg = false;

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
  }
};
</script>
<style>
.FixedHeightAndWidth {
  height: 10vh;
}
[dir] .vx-card .vx-card__collapsible-content .vx-card__body {
  padding-bottom: 5px !important;
  padding-top: 5px !important;
  padding: 0.5rem !important;
}
.FixedHeight {
  height: 200px !important;
}
</style>
