<template>
  <div>
    <div class="w-full" id="Scroll">
      <vx-card v-if="!showTransferBalanceDiv && CompanyUsers.length > 0">
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-for="(item, index) in CompanyUsers"
          :key="index"
        >
          <vx-card class="mb-2">
            <div class="flex justify-between text-center">
              <div class="flex items-start">
                <div
                  class="vx-col self-center ml-4 mr-4"
                  :class="index == ActiveIndex ? 'text-primary' : ''"
                >
                  <div class="vx-row ">
                    <p class="ml-2 mr-2 text-xl font-bold">
                      {{ item.firstName }} {{ item.lastName }}
                    </p>
                  </div>
                  <div class="vx-row">
                    <p class="ml-2 mr-2 text-md" :dir="$vs.rtl ? 'ltr' : 'ltr'">
                      {{ item.PhoneNumber }}
                    </p>
                  </div>
                </div>
              </div>
              <vs-radio
                @change="selectThisUser(item, index)"
                v-model="item.checked"
                vs-value="false"
                class="m-2"
                vs-name="AddBalanceToSelectedUser"
              ></vs-radio>
            </div>
          </vx-card>
        </div>
        <div class="flex justify-center text-center">
          <vs-button class="mr-4" @click="ContinueButton">{{
            $t("Proceed")
          }}</vs-button>
        </div>
      </vx-card>
      <vx-card v-if="!showTransferBalanceDiv && CompanyUsers.length == 0">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            class="m-4 text-2xl text-warning"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            {{ $t("showNoUsersAvailable") }}
          </vs-col>
        </vs-row>
      </vx-card>
      <vx-card v-if="showTransferBalanceDiv">
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
            <h2
              class="m-1"
              v-if="WalletBalance.balance >= 0"
              style="color:green"
            >
              {{ WalletBalance.balance | numFormat("###,##0.00") }}
            </h2>
            <h2 class="m-1" v-if="WalletBalance < 0" style="color:red">
              {{ WalletBalance.balance | numFormat("###,##0.00") }}
            </h2>
            <h5>
              {{ $t(userInfo.WalletCountryCode + "_Currency") }}
            </h5>
          </vs-col>
        </vs-row>
        <vs-row vs-type="flex" vs-justify="center" vs-w="12">
          <vs-col
            class="m-4"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
          >
            <vs-input
              @input="NotValidAmount"
              v-model="Amount"
              type="number"
              min="1"
              class="w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3"
              icon-after
              :icon="$t(`${userInfo.WalletCountryCode}_Currency`)"
            />
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            v-if="showAmountNote"
          >
            <span class="text-warning mb-4 mt-4">{{
              $t("NotValidAmount")
            }}</span>
          </vs-col>
        </vs-row>
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            class="m-4"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <vs-button
              class="w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3"
              :disabled="Amount == '' || showAmountNote"
              @click="TransferBalanceToUser"
            >
              {{ $t("TransferBalance") }}</vs-button
            >
          </vs-col>
        </vs-row>
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
import moduleCompany from "@/store/company/moduleCompany.js";
import moduleUser from "@/store/user/moduleUser.js";

export default {
  data() {
    return {
      CompanyUsers: [],
      SelectedUser: {},
      itemsPerPage: 10,
      AddBalanceToSelectedUser: false,
      ActiveIndex: null,
      showTransferBalanceDiv: false,
      userInfo: null,
      WalletBalance: {},
      Amount: "",
      showAmountNote: false,
      showHasNoBalance: false
    };
  },
  methods: {
    NotValidAmount() {
      if (this.Amount.includes(".")) {
        if (this.Amount.split(".")[1].length > 2) {
          this.showAmountNote = true;
        } else {
          this.showAmountNote = false;
        }
      }
    },
    TransferBalanceToUser() {
      if (!this.showAmountNote && this.Amount == "") {
        window.showError();
        return;
      }
      let balance = this.WalletBalance.balance;

      if (parseFloat(this.Amount) <= parseFloat(balance)) {
        this.showHasNoBalance = false;
        var Model = {};
        Model.UserID = JSON.parse(localStorage.getItem("userInfo")).Id;
        Model.RecieverUserID = this.SelectedUser.Id;
        Model.Amount = this.Amount;
        this.$vs.loading();

        this.$store
          .dispatch("Company/TransferBalanceToUser", Model)
          .then(response => {
            if (response.status === 200) {
              this.$vs.loading.close();
              window.showBalanceTransfered();
              this.Amount = "";
              this.$router.push({ name: "Wallet" });
            }
          })
          .catch(error => {
            if (error.status == 400) {
              this.$vs.notify({
                color: "#EA5455",
                position: "top-center",
                title: this.$t("Error"),
                text: this.$t(error.data)
              });
              this.$vs.loading.close();
              this.Amount = "";
            } else {
              this.$vs.loading.close();
              window.showError();
              this.Amount = "";
            }
          });
      } else {
        this.showHasNoBalance = true;
      }
    },
    Back() {
      this.$router.go(-1);
    },
    ContinueButton() {
      this.showTransferBalanceDiv = true;
      let JsonObj = {};
      JsonObj.PhoneNo = JSON.parse(
        localStorage.getItem("userInfo")
      ).PhoneNumber;
      this.$store.dispatch("User/GetUserBalance", JsonObj).then(response => {
        if (response.status == 200) {
          this.WalletBalance = response.data;
        }
      });
    },
    selectThisUser(item, index) {
      this.ActiveIndex = index;
      this.AddBalanceToSelectedUser = item.checked;

      if (item != null) {
        this.SelectedUser = item;
      }
    },
    FetchUsers() {
      this.$vs.loading();
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let JsonObj = {};
      if (userInfo.CompanyId == 0) {
        JsonObj.CompanyId = "";
      } else {
        JsonObj.CompanyId = userInfo.CompanyId;
      }

      this.$store
        .dispatch("Company/GetCompanyUsers", JsonObj)
        .then(response => {
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.CompanyUsers = response.data;
              for (let i = 0; i < this.CompanyUsers.length; i++) {
                this.CompanyUsers[i].checked = false;
              }
              this.CompanyUsers = this.CompanyUsers.filter(function(el) {
                return el.Id != JSON.parse(localStorage.getItem("userInfo")).Id;
              });

              this.$vs.loading.close();
            } else {
              this.$vs.loading.close();
              window.showNoRecords();
            }
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },

  created() {
    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }
    if (!moduleUser.isRegistered) {
      this.$store.registerModule("User", moduleUser);
      moduleUser.isRegistered = true;
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    this.FetchUsers();
  }
};
</script>
<style lang="scss">
#page-user-list {
  .user-list-filters {
    height: 10px;

    .vs__actions {
      position: absolute;
      right: 0;
      top: 20%;
      height: 100px;
      transform: translateY(-58%);
    }
  }
}

#instant-search-demo {
  .header {
    .filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .price-slider {
    max-width: 80%;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
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

.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
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
}

#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
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
}</style
><style>
.vs-sidebar.vs-sidebar-parent {
  max-height: 1500px !important;
}
</style>
