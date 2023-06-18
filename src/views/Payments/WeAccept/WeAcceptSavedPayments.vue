<template>
  <div>
    <!-- list of cards -->
    <div v-if="PaywithExistingCard == 'true'">
      <div class="m-2" v-for="(item, index) in ListOfCards" :key="index">
        <vx-card class="">
          <div class="flex justify-between text-center">
            <div class="flex items-start ">
              <img
                :src="getCardPicture(item.CardSubtype)"
                class=" FixedHeightAndWidth"
              />
              <p class="ml-2 text-md self-center">
                {{ item.MaskedPan }}
              </p>
            </div>
            <feather-icon
              icon="Trash2Icon"
              class="flex items-end self-center  IconsColor"
              svgClasses="stroke-current h-8 w-8 text-danger"
              style="cursor: pointer;"
              @click="deleteCard(item)"
            />
          </div>
        </vx-card>
      </div>
    </div>
    <!-- New Payment Method -->
    <vs-row
      vs-type="flex"
      class="justify-center mt-2"
      v-if="PaywithExistingCard == 'false'"
    >
      <span class="text-warning text-2xl mb-4">{{
        $t("NoSavedPayments")
      }}</span>
      <!--   <div>
          <iframe
            :src="
              `https://accept.paymobsolutions.com/api/acceptance/iframes/64493?payment_token=${token}`
            "
            class="w-full h-screen"
          ></iframe>
        </div> -->
    </vs-row>
    <!-- button continue -->

    <div class="align-middle mb-2 mt-2 ">
      <vs-row vs-type="flex" class="justify-center mt-2">
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
  </div>
</template>

<script>
import moduleUser from "@/store/user/moduleUser.js";
export default {
  data() {
    return {
      showAmountNote: false,
      AddNewCardImg: require("@/assets/images/ClientAssets/bt_ic_vaulted_unknown.png"),
      token: null,
      showAddButton: false,
      PaymentModel: {
        Amount: "",
        UserId: ""
      },
      userInfo: null,
      DeletedCard: false,
      Msg: null,
      ShowWarningMsg: true,
      ListOfCards: [],
      StatusImage: null,
      PaywithExistingCard: "false",
      ResponseModel: {},
      CardObject: null
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
    deleteCard(CardObject) {
      this.CardObject = CardObject;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("Delete"),
        text:
          this.$t("YouAreAboutToDelete") +
          " " +
          this.CardObject.CardSubtype +
          " " +
          this.$t("endswith") +
          " " +
          this.CardObject.Pan,
        cancelText: this.$t("Cancel"),
        accept: this.DeleteSelectedCard,
        acceptText: this.$t("Delete")
      });
    },
    DeleteSelectedCard() {
      this.$vs.loading();
      let Obj = {};
      Obj.Id = this.CardObject.Id;

      this.$store
        .dispatch("User/DeleteWeAcceptPaymentMethods", Obj)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            this.checkSavedPayment();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
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
    checkSavedPayment() {
      //close add balance part

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
              this.$vs.loading.close();
            } else {
              this.$vs.loading.close();
              this.PaywithExistingCard = "false";
              // this.GenerateToken();
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
      //   JsonObj.Amount = this.PaymentModel.Amount;
      JsonObj.Amount = 0;

      this.$store
        .dispatch("User/GenerateTokenByWeAccept", JsonObj)
        .then(async response => {
          // if (response.status == 200) {
          this.$vs.loading.close();
          this.token = await response.data;
          // }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
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
    this.checkSavedPayment();
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
