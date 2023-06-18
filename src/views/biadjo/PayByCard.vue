<template>
  <div>
    <div class="w-full" id="Scroll">
      <vx-card>
        <!-- payment info -->

        <div v-if="!showResult">
          <!-- pay by card container -->
          <div id="dropin-container" :dir="$vs.rtl ? 'ltr' : 'ltr'"></div>
          <!-- pay button -->
          <vs-row vs-type="flex" class="justify-center mt-2">
            <vs-button
              v-show="showCheckOutButton"
              id="submit-button"
              class="w-full"
            >
              {{ $t("Checkout") }}
            </vs-button>
          </vs-row>
        </div>

        <!-- payment result  -->
        <div class="payment result" v-if="showResult">
          <!-- redirectnote-->
          <vs-row
            v-if="ShowCallDriver"
            vs-type="flex"
            vs-justify="center"
            class="mb-4"
          >
            <span class="text-primary text-2xl">{{ $t("CallDriver") }}</span>
          </vs-row>
          <vs-row
            v-if="ShowRedirectMsg"
            vs-type="flex"
            vs-justify="center"
            class="mb-4"
          >
            <span class="text-primary text-lg">{{ $t("RedirectNote") }}</span>
          </vs-row>
          <vs-row vs-type="flex">
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="12"
            >
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
            <!-- RecieptID -->
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
            <!-- TransactionNumber -->
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="12"
              v-if="ResponseModel.TransactionId"
            >
              <div class="flex flex-wrap m-4">
                <h3>
                  {{ $t("TransactionNumber") }}:
                  {{ ResponseModel.TransactionId }}
                </h3>
              </div>
            </vs-col>
            <!-- Result -->
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

          <!-- back button -->
          <!-- <div class="vx-row">
            <div class="vx-col w-full m-2">
              <div class="vx-row">
                <vs-button
                  color="warning"
                  style="padding-left: 5px;padding-right: 5px;"
                  class=" w-full"
                  @click="Back"
                >
                  {{ $t("Back") }}
                </vs-button>
              </div>
            </div>
          </div> -->
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import dropIn from "braintree-web-drop-in";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import { en, ar } from "vuejs-datepicker/src/locale";
import moduleUser from "@/store/user/moduleUser.js";

export default {
  components: {},

  data() {
    return {
      ShowRedirectMsg: false,
      ShowCallDriver: false,
      showCheckOutButton: false,
      showcadrs: false,
      showCheckOut: false,
      showResult: false,
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
      ResponseModel: {},
      InsuranceValue: 0,
      selectedOffer: {},
      userInfo: {},

      ar: ar,
      en: en
    };
  },

  methods: {
    generateToken() {
      this.$vs.loading();
      let JsonObj = {};
      JsonObj.UserID = this.userInfo.Id;
      JsonObj.UserType = "client";
      this.$store.dispatch("User/GenerateToken", JsonObj).then(response => {
        if (response.status == 200) {
          this.authorization = response.data.ClientToken;
          const config = {
            authorization: this.authorization,
            container: "#dropin-container",
            styles: {
              direction: "ltr"
            },
            venmo: false,
            threeDSecure: {
              amount: this.PaymentModel.Total
            },
            dataCollector: {
              kount: true // Required if Kount fraud data collection is enabled
            },
            card: {
              vault: {
                allowVaultCardOverride: false,
                vaultCard: true
              },
              cardholderName: {
                required: true
              }
            }
          };

          dropIn.create(config, (createErr, instance) => {
            this.instance = instance;
            this.showCheckOutButton = true;
            this.$vs.loading.close();
          });

          var button = document.getElementById("submit-button");
          button.addEventListener("click", () => {
            this.instance.requestPaymentMethod((err, payload) => {
              if (payload) {
                this.$vs.loading.close();
                this.PaymentModel.PaymentMethodNonce = payload.nonce;
                this.PaymentModel.device_data = payload.deviceData;

                this.PayWithSelectedMethod();
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
        .dispatch("User/CheckoutBiadjoCreditCard", this.PaymentModel)
        .then(response => {
          if (response.status == 200) {
            if (response.data.Result.includes("Success")) {
              this.ResponseModel = response.data;
              this.$router.push({
                name: "TransactionStatus",
                params: {
                  success: "true",
                  id: this.ResponseModel.TransactionId
                }
              });

              // this.Msg = "Success";
              // this.showResult = true;
              // this.showcadrs = false;
              // this.StatusImage = require("@/assets/images/ClientAssets/_checked.png");

              // this.ShowRedirectMsg = true;
              // this.ShowCallDriver = true;
              this.$vs.loading.close();
            }
          }
        })
        .catch(err => {
          this.ResponseModel = err.data;
          this.$router.push({
            name: "TransactionStatus",
            params: {
              success: "false",
              id: this.ResponseModel.TransactionId
            }
          });
          this.$vs.loading.close();
        });
    },

    Back() {
      this.$router.go(-1);
    }
  },

  created() {
    window.isUserAllowedToCheckOutByCard(this.$route.params.offer);
    if (!moduleUser.isRegistered) {
      this.$store.registerModule("User", moduleUser);
      moduleUser.isRegistered = true;
    }
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.selectedOffer = this.$route.params.offer;
    this.PaymentModel.BiadjoID = this.selectedOffer.BiadjoRequesId;
    this.PaymentModel.UserId = this.userInfo.Id;
    this.PaymentModel.OfferValue = this.selectedOffer.Offer;
    this.PaymentModel.DriverId = this.selectedOffer.DriverId;
    this.PaymentModel.Total = this.selectedOffer.Total;
    this.PaymentModel.InsuranceValue = this.selectedOffer.InsuranceValue;
    this.PaymentModel.OfferID = this.selectedOffer.Id;
    this.generateToken();
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
