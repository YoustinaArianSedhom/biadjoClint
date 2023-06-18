<template>
  <div>
    <div class="w-full" id="Scroll">
      <vx-card>
        <!-- payment info -->

        <div>
          <!-- list of cards -->
          <div v-if="ShowPaywithExistingCard == 'false'">
            <div class="m-2" v-for="(item, index) in ListOfCards" :key="index">
              <vx-card class="pb-0 pt-0 ">
                <div class="vx-row text-center ">
                  <vs-radio
                    v-model="item.checked"
                    vs-value="false"
                    class="m-2"
                    @change="selectThisCard(item)"
                    vs-name="PaywithExistingCard"
                  ></vs-radio>
                  <img
                    :src="getCardPicture(item.CardSubtype)"
                    class="FixedHeightAndWidth"
                  />
                  <p class="ml-2 mr-2 text-xl  self-center">
                    {{ item.MaskedPan }}
                  </p>
                </div>
              </vx-card>
            </div>
            <div class="m-2">
              <vx-card class=" align-middle w-full">
                <div class="vx-row  text-center ">
                  <vs-radio
                    v-model="PaywithExistingCard"
                    vs-value="true"
                    class="m-2"
                    vs-name="PaywithExistingCard"
                  ></vs-radio>
                  <img :src="AddNewCardImg" class="FixedHeightAndWidth" />
                  <p class="ml-2 mr-2 text-xl align-middle self-center">
                    {{ $t("AddNewCard") }}
                  </p>
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
              <vs-button class="mr-4" @click="ContinueButton">{{
                $t("Continue")
              }}</vs-button>
              <vs-button
                type="border"
                color="warning"
                icon-pack="feather"
                @click="Back"
                class="ml-4"
              >
                {{ $t("Back") }}</vs-button
              >
            </vs-row>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleUser from "@/store/user/moduleUser.js";

export default {
  components: {},

  data() {
    return {
      Selectedcard: {},
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
      ShowBalancePart: true,
      ListOfCards: [],
      PaywithExistingCard: "false",
      ResponseModel: {},
      // PaymentModel: {
      //   Total: "",
      //   OfferValue: "",
      //   InsuranceValue: "",
      //   PaymentMethodNonce: "",
      //   BiadjoID: "",
      //   OfferID: "",
      //   UserId: "",
      //   DriverId: "",
      //   device_data: ""
      // },

      InsuranceValue: 0,
      selectedOffer: {}
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
      Obj.OfferID = this.PaymentModel.OfferID;
      Obj.BiadjoID = this.PaymentModel.BiadjoID;
      this.$store
        .dispatch("User/PayBiadjoSavedPaymentMethods", Obj)
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
      JsonObj.OfferID = this.PaymentModel.OfferID;
      JsonObj.BiadjoID = this.PaymentModel.BiadjoID;

      this.$store
        .dispatch("User/WeAcceptGetSavedPaymentMethods", JsonObj)
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
    }
  },
  created() {
    window.isUserAllowedToCheckOutByCard(this.$route.params.offer);
    if (!moduleUser.isRegistered) {
      this.$store.registerModule("User", moduleUser);
      moduleUser.isRegistered = true;
    }

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.selectedOffer = this.$route.params.offer;
    this.PaymentModel.BiadjoID = this.selectedOffer.BiadjoRequesId;
    this.PaymentModel.UserId = this.userInfo.Id;
    // this.PaymentModel.OfferValue = this.selectedOffer.Offer;
    this.PaymentModel.OfferID = this.selectedOffer.Id;
    this.checkSavedPayment();
  }
};
</script>

<style lang="scss">
.Size {
  width: 150px !important;
  height: 120px !important;
}
#parentx {
  overflow: hidden;
  height: 500px;
  position: relative;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}

#data-list-list-view {
  .vs-con-table {
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }
  }
}</style
><style>
.vs-sidebar.vs-sidebar-parent {
  max-height: 1500px !important;
}
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
