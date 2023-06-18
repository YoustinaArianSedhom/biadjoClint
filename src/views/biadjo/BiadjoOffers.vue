<template>
  <div>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          v-show="!showCheckOut"
          id="data-list-list-view"
          class="data-list-container"
        >
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="offersWithKM"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4 mb-2"
                @click="Back"
                type="border"
                color="warning"
                icon-pack="feather"
              >
                {{ $t("Back") }}
              </vs-button>
              <h2 class="text-primary">{{ $t("offersWithKM") }}</h2>
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <vs-th sort-key="Offer Number">{{ $t("OfferNumber") }}</vs-th>
              <vs-th sort-key="Biadjo Number">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Offer Value">{{ $t("Value") }}</vs-th>
              <vs-th sort-key="Driver Distance">{{ $t("Distance") }}</vs-th>
              <vs-th sort-key="Driver Duration">{{ $t("Duration") }}</vs-th>
              <vs-th sort-key="DriverR ating">{{ $t("Rating") }}</vs-th>

              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="id font-medium truncate">
                      {{ tr.BiadjoRequesId }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Price">
                      {{ tr.Offer | numFormat("###,##0.00") }}
                      {{ $t(userInfo.countrycode + "_Currency") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Distance }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Duration }}</p>
                  </vs-td>

                  <vs-td :dir="$vs.rtl ? 'rtl' : 'ltr'">
                    <star-rating
                      v-model="tr.DriverRating"
                      v-bind:increment="0.01"
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                      v-bind:max-rating="5"
                      inactive-color="gray"
                      active-color="orange"
                      v-bind:read-only="true"
                      v-bind:show-rating="false"
                      v-bind:round-start-rating="false"
                      v-bind:star-size="20"
                    >
                    </star-rating>
                    <!-- <span>
                    ( {{ tr.DriverRating | numFormat("0.00") }} )
                  </span> -->
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      size="small"
                      class="text-xl"
                      :disabled="tr.Status != 'OS1'"
                      @click="AcceptOffer(tr)"
                      color="success"
                      >{{ $t("AcceptOffer") }}</vs-button
                    >
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
          <vs-divider></vs-divider>
          <div class="mb-2"></div>
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="offers"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4 mb-2"
                @click="Back"
                type="border"
                color="warning"
                icon-pack="feather"
              >
                {{ $t("Back") }}
              </vs-button>
              <h2 class="text-primary">{{ $t("DriversOffers") }}</h2>

              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <vs-th sort-key="Offer Number">{{ $t("OfferNumber") }}</vs-th>
              <vs-th sort-key="Biadjo Number">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Offer Value">{{ $t("Value") }}</vs-th>
              <vs-th sort-key="Driver Distance">{{ $t("Distance") }}</vs-th>
              <vs-th sort-key="Driver Duration">{{ $t("Duration") }}</vs-th>
              <vs-th sort-key="DriverR ating">{{ $t("Rating") }}</vs-th>

              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="id font-medium truncate">
                      {{ tr.BiadjoRequesId }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Price">
                      {{ tr.Offer | numFormat("###,##0.00") }}
                      {{ $t(userInfo.countrycode + "_Currency") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Distance }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Duration }}</p>
                  </vs-td>

                  <vs-td :dir="$vs.rtl ? 'rtl' : 'ltr'">
                    <star-rating
                      v-model="tr.DriverRating"
                      v-bind:increment="0.01"
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                      v-bind:max-rating="5"
                      inactive-color="gray"
                      active-color="orange"
                      v-bind:read-only="true"
                      v-bind:show-rating="false"
                      v-bind:round-start-rating="false"
                      v-bind:star-size="20"
                    >
                    </star-rating>
                    <!-- <span>
                    ( {{ tr.DriverRating | numFormat("0.00") }} )
                  </span> -->
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      size="small"
                      class="text-xl"
                      :disabled="tr.Status != 'OS1'"
                      @click="AcceptOffer(tr)"
                      color="success"
                      >{{ $t("AcceptOffer") }}</vs-button
                    >
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>

        <div class="parentx-static" v-if="showCheckOut && CanSee">
          <div>
            <vs-row vs-type="flex" vs-justify="center">
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="4"
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
            <!-- offer value -->
            <vs-row vs-type="flex" vs-justify="center">
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="4"
              >
                <h3 class="m-2">
                  {{ $t("OfferValue") }}
                </h3>
              </vs-col>
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <h2 class="m-1">
                  {{ selectedOffer.Offer | numFormat("###,##0.00") }}
                  {{ $t(userInfo.countrycode + "_Currency") }}
                </h2>
              </vs-col>
            </vs-row>
            <!-- Insurance Value -->
            <vs-row vs-type="flex" vs-justify="center">
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="4"
              >
                <h3 class="m-2">
                  {{ $t("InsuranceValue") }}
                </h3>
              </vs-col>
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <h2 class="m-1">
                  {{ selectedOffer.InsuranceValue | numFormat("###,##0.00") }}
                  {{ $t(userInfo.countrycode + "_Currency") }}
                </h2>
              </vs-col>
            </vs-row>
            <hr />
            <!-- total value -->
            <vs-row vs-type="flex" vs-justify="center">
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="4"
              >
                <h3 class="m-2">
                  {{ $t("TotalValue") }}
                </h3>
              </vs-col>
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="2"
              >
                <h2 class="m-1" style="color:green">
                  {{
                    (selectedOffer.InsuranceValue + selectedOffer.Offer)
                      | numFormat("###,##0.00")
                  }}
                  {{ $t(userInfo.countrycode + "_Currency") }}
                </h2>
              </vs-col>
            </vs-row>

            <vs-row vs-type="flex" vs-justify="right">
              <vs-col
                class="m-4"
                vs-type="flex"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                vs-w="12"
              >
                <h6 class="m-1">
                  {{ $t("IncludeVAT") }}
                </h6>
                <h6 class="m-1">
                  {{ $t("RoadAndScaleChargesVat") }}
                </h6>
              </vs-col>
            </vs-row>

            <!-- Checkout button -->
            <vs-row vs-type="flex" vs-justify="center">
              <vs-col
                class="m-4"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12"
              >
                <vs-button class="mr-4 ml-4 text-xl" @click="Checkout">
                  {{ $t("Checkout") }}</vs-button
                >
              </vs-col>
            </vs-row>
          </div>
        </div>
        <!-- Select Payment Method -->
        <div
          class="grid-layout-container alignment-block"
          v-show="showSelectPayMethod"
        >
          <!-- select card or wallet -->
          <div>
            <vs-row
              vs-align="center"
              vs-type="flex"
              vs-justify="center"
              vs-w="12"
            >
              <!-- debtCard -->
              <vs-col
                class="m-2"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12"
              >
                <vs-button
                  class="p-1 m-2"
                  color="primary"
                  type="border"
                  size="small"
                  @click="SetMethod('card')"
                >
                  <img
                    class="Size mb-2"
                    color="primary"
                    alt="No Image"
                    :src="
                      require(`@/assets/images/ClientAssets//Icons_CreditCard.png`)
                    "
                  />
                  {{ $t("CreditOrDeptCard") }}</vs-button
                >

                <vs-button
                  class="p-1 m-2"
                  color="primary"
                  type="border"
                  size="small"
                  @click="SetMethod('wallet')"
                >
                  <img
                    class="Size mb-2"
                    color="primary"
                    alt="No Image"
                    :src="
                      require(`@/assets/images/ClientAssets//History_Wallet.png`)
                    "
                  />
                  {{ $t("Wallet") }}</vs-button
                >
              </vs-col>
            </vs-row>
            <!-- Proceed button -->
            <div class="vx-row">
              <div class="vx-col w-full m-2">
                <div class="vx-row">
                  <vs-button
                    style="padding-left: 5px;padding-right: 5px;"
                    class=" w-full"
                    :disabled="SelectedMethod == ''"
                    @click="Proceed"
                  >
                    {{ $t("Proceed") }}</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <vs-row vs-type="flex" vs-justify="center" v-if="showHasNoBalance">
          <vs-col
            class=""
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="4"
          >
            <h3 class="text-warning mb-4 mt-4">
              {{ $t("NotEnoughBalance") }}
            </h3>
          </vs-col>
        </vs-row>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import StarRating from "vue-star-rating";
import moduleUser from "@/store/user/moduleUser.js";

export default {
  components: {
    StarRating
  },
  data() {
    return {
      WalletCountryCode: "",
      showSelectPayMethod: false,
      CanSee: true,
      SelectedMethod: "",
      selectedOffer: {},
      userInfo: {},
      offers: [],
      offersWithKM: [],
      Dropdown: false,
      selected: [],
      itemsPerPage: 10,
      showCheckOut: false,
      InsuranceValue: null,
      PaymentModel: {
        Total: "",
        OfferValue: "",
        InsuranceValue: "",
        PaymentMethodNonce: "",
        BiadjoID: "",
        OfferID: "",
        UserId: "",
        DriverId: "",
        device_data: ""
      },
      WalletBalance: {},
      ResponseModel: {},
      havebalance: false,
      showHasNoBalance: false
    };
  },
  watch: {
    $route() {
      if (this.Dropdown) {
        this.Dropdown = false;
      }
    }
  },

  methods: {
    Checkout() {
      this.showSelectPayMethod = true;
      this.CanSee = false;
    },
    CkeckUserBalance() {
      this.$vs.loading();

      let JsonObj = {};
      JsonObj.PhoneNo = this.userInfo.PhoneNumber;
      let balance;
      let creditlimit;

      this.$store
        .dispatch("User/GetUserBalance", JsonObj)
        .then(response => {
          if (response.status == 200) {
            balance = response.data.balance;
            creditlimit = response.data.creditlimet;

            if (
              -1 * creditlimit <=
              balance -
                (this.selectedOffer.Offer + this.selectedOffer.InsuranceValue)
            ) {
              let JsonObj = {};
              JsonObj.Total = (
                this.selectedOffer.Offer + this.selectedOffer.InsuranceValue
              ).toFixed(2);
              JsonObj.OfferValue = this.selectedOffer.Offer;
              JsonObj.InsuranceValue = this.selectedOffer.InsuranceValue;
              JsonObj.BiadjoID = this.selectedOffer.BiadjoRequesId;
              JsonObj.OfferID = this.selectedOffer.Id;
              JsonObj.UserId = this.userInfo.Id;
              JsonObj.DriverId = this.selectedOffer.DriverId;

              this.$store
                .dispatch("User/CheckoutBiadjoWallet", JsonObj)
                .then(response => {
                  if (response.status == 200) {
                    this.ResponseModel = response.data;
                    this.$vs.loading.close();
                    this.$router.push({
                      name: "TransactionStatus",
                      params: {
                        success: "true",
                        id: response.data.RecieptID
                      }
                    });
                  }
                })
                .catch(() => {
                  this.$vs.loading.close();
                  this.$router.push({
                    name: "TransactionStatus",
                    params: {
                      success: "false",
                      id: "0"
                    }
                  });
                });
            } else {
              this.$vs.loading.close();
              this.showHasNoBalance = true;
            }
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    checkPaymentGateway() {
      var Obj = {};
      Obj.CountryCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode;

      this.$store
        .dispatch("User/GetCountryPaymentGatway", Obj)
        .then(response => {
          if (response.status == 200 && response.data.Error == "") {
            this.RouteToPage(response.data.PaymentGatway);
          }
        });
    },
    Proceed() {
      if (this.SelectedMethod == "wallet") {
        this.showSelectPayMethod = true;
        this.CkeckUserBalance();
      } else if (this.SelectedMethod == "card") {
        this.showSelectPayMethod = false;
        this.checkPaymentGateway();
      }
    },
    RouteToPage(PaymentGatwayName) {
      switch (PaymentGatwayName) {
        case "weaccept":
          this.$router.push({
            name: "CardCheckout",
            params: {
              offer: this.selectedOffer
            }
          });
          break;
        case "braintree":
          this.$router.push({
            name: "PayByCard",
            params: {
              offer: this.selectedOffer
            }
          });
          break;
        case "payfort":
          this.$router.push({ name: "home" });
          break;
      }
    },
    SetMethod(method) {
      this.SelectedMethod = method;
    },
    GetBiadjoDetails(BiadjoID) {
      var JsonValue = {};
      JsonValue.BiadjoID = BiadjoID;

      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", JsonValue)
        .then(res => {
          if (res.status == 200) {
            this.selectedOffer.InsuranceValue = res.data.InsuranceValue;
            this.selectedOffer.Total = (
              this.selectedOffer.Offer + this.selectedOffer.InsuranceValue
            ).toFixed(2);
            this.showCheckOut = true;
          }
        })
        .catch(() => {
          window.showError();
        });
    },
    getWalletBalance() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let JsonObj = {};
      JsonObj.PhoneNo = this.userInfo.PhoneNumber;
      this.$store.dispatch("User/GetUserBalance", JsonObj).then(response => {
        if (response.status == 200) {
          this.WalletBalance = response.data.balance;
        }
      });
    },
    AcceptOffer(offer) {
      this.$vs.loading();

      let JsonValue = {};
      JsonValue.DriverId = offer.DriverId;
      JsonValue.BiadjoId = offer.BiadjoRequesId;
      this.$store
        .dispatch("BiadjoList/CheckIfDriverHasAnotherBiadjo", JsonValue)
        .then(response => {
          if (response.data == true) {
            this.$vs.notify({
              color: "warning",
              position: "bottom-center",
              text: this.$t("HasAnotherTrip"),
              time: 5000
            });
            this.getOffers();
          }
          if (response.data == false) {
            this.$vs.loading.close();
            this.selectedOffer = offer;
            this.getWalletBalance();
            this.GetBiadjoDetails(this.selectedOffer.BiadjoRequesId);
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    Back() {
      this.$router.go(-1);
    },
    getOffers() {
      this.offers = [];
      this.offersWithKM = [];
      this.$validator.validateAll().then(result => {
        if (result) {
          this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

          var JsonValue = {};
          JsonValue.UserID = this.userInfo.Id;
          JsonValue.BiadjoID = this.$route.params.Id;
          JsonValue.Lang = this.$i18n.locale;

          this.$store
            .dispatch("BiadjoList/GetOffers", JsonValue)
            .then(res => {
              if (res.status == 200) {
                if (res.data.length > 0) {
                  res.data.forEach(element => {
                    if (element.KMOffer == 0) {
                      this.offers.push(element);
                    }
                    if (element.KMOffer == 1) {
                      this.offersWithKM.push(element);
                    }
                  });
                  // this.offers = res.data;
                  this.$vs.loading.close();
                } else {
                  this.$vs.loading.close();
                  window.showNoRecords();
                }
              }
            })
            .catch(() => {
              this.$vs.loading.close();
              window.showError();
            });
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
    }
  },
  created() {
    this.$vs.loading();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!moduleUser.isRegistered) {
      this.$store.registerModule("User", moduleUser);
      moduleUser.isRegistered = true;
    }
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    this.getOffers();

    this.$vs.loading.close();
  }
};
</script>

<style lang="scss">
.Size {
  min-width: 40px !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 120px !important;
  max-height: 90px !important;
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

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
.theme-dark {
  #instant-search-demo {
    #content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #content-container {
    .vs-sidebar {
      position: fixed !important;
      float: left !important;
    }
  }
}

.grid-view-item {
  // height: 450px;

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }

  button.page-link {
    display: inline-block;
  }

  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }

  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
}</style
><style>
.vs-sidebar.vs-sidebar-parent {
  max-height: 1500px !important;
}
</style>
