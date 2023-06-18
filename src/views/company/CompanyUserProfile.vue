<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      v-bind:title="$t('UserNotFound')"
      :active.sync="ID_Not_Found"
    >
      <span
        >user record with Phone number : {{ $route.params.Id }} not found.
      </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'CompanyUsers' }"
          class="text-inherit underline"
          >All Users</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData">
      <vx-card class="mb-base">
        <div class="vx-row">
          <!-- <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="FormData.ProfilePicture" class="rounded w-full" />
            </div>
          </div> -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ FormData.firstName }} {{ FormData.lastName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>{{ FormData.PhoneNumber }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ FormData.Email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}</td>
                <td>{{ $t(FormData.AccountStatus) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <td style="width:200px" v-show="FormData.AccountType != 'AT3'">
                  <v-select
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full"
                    :options="this.$options.AccountTypeJSON"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="FormData.AccountType"
                  ></v-select>
                </td>
                <td v-show="FormData.AccountType == 'AT3'">
                  {{ $t(FormData.AccountType) }}
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ FormData.Id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("RegistrationDate") }}</td>
                <td>
                  {{
                    FormData.RegistrationDate | formatDate("yyyy/MM/dd HH:mm")
                  }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ FormData.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ FormData.countrycode }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col w-full" id="account-manage-buttons">
            <div class="vx-row w-full">
              <div class="mb-2 mt-2 " v-show="FormData.AccountType != 'AT3'">
                <vs-button
                  class="mr-4"
                  @click="confirmUpdateAccountType"
                  icon-pack="feather"
                  >{{ $t("UpdateAccountType") }}</vs-button
                >
              </div>

              <div class="mb-2 mt-2 " v-show="FormData.AccountType != 'AT3'">
                <vs-button
                  v-show="FormData.AccountStatus == 'AS1'"
                  class="mr-4"
                  @click="confirmRemove1('AS2')"
                  icon-pack="feather"
                  >{{ $t("Deactivate") }}</vs-button
                >
                <!-- </div>
              <div class="mb-2 mt-2 "> -->
                <vs-button
                  v-show="FormData.AccountStatus == 'AS2'"
                  class="mr-4"
                  @click="confirmRemove2('AS1')"
                  icon-pack="feather"
                  >{{ $t("Activate") }}</vs-button
                >
              </div>
              <div class="mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  class="mr-4"
                  icon-pack="feather"
                  @click="Back"
                  >{{ $t("Back") }}</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import moduleAuth from "@/store/auth/moduleAuth.js";
import moduleCompany from "@/store/company/moduleCompany.js";
import AccountType_JSON from "./../JsonFiles/companyUserUpdateAccountType.json";

export default {
  AccountTypeJSON: AccountType_JSON,
  data() {
    return {
      AS: "",
      FormData: {},
      Amount: "",
      ID_Not_Found: false,
      OldAccountStatus: ""
    };
  },
  methods: {
    confirmRemove1(AS) {
      this.AS = AS;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmRemove"),
        text:
          this.$t("YouAreAboutToDeActivateThis") +
          " " +
          this.FormData.firstName +
          " " +
          this.FormData.lastName,
        cancelText: this.$t("Cancel"),
        accept: this.RemoveUser,
        acceptText: this.$t("Update")
      });
    },
    confirmRemove2(AS) {
      this.AS = AS;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmRemove"),
        text:
          this.$t("YouAreAboutToActivateThis") +
          " " +
          this.FormData.firstName +
          " " +
          this.FormData.lastName,
        cancelText: this.$t("Cancel"),
        accept: this.RemoveUser,
        acceptText: this.$t("Update")
      });
    },

    RemoveUser() {
      this.$vs.loading();
      let form = {};
      form.PhoneNo = this.FormData.PhoneNumber;
      form.AccountStatus = this.AS;
      this.$store
        .dispatch("Company/UpdateAccountFromCompany", form)
        .then(res => {
          if (res.status === 200) {
            this.$vs.loading.close();
            window.showSuccessRemoveUser();
            this.fetchData();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
      this.$vs.loading.close();
    },
    confirmUpdateAccountType() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text:
          this.$t("YouAreAboutToUpdateThis") +
          " " +
          this.FormData.firstName +
          " " +
          this.FormData.lastName +
          " " +
          this.$t("AccountType"),
        cancelText: this.$t("Cancel"),
        accept: this.UpdateUserAccountType,
        acceptText: this.$t("Update")
      });
    },
    UpdateUserAccountType() {
      this.$vs.loading();
      let form = {};
      form.PhoneNo = this.FormData.PhoneNumber;
      form.AccountType = this.FormData.AccountType;
      this.$store
        .dispatch("Company/UpdateUserAccountType", form)
        .then(res => {
          if (res.status === 200) {
            this.$vs.loading.close();
            window.showSuccess();
            //this.Back();
          }
        })
        .catch(err => {
          this.$vs.loading.close();
          console.error(err);
          window.showError();
        });
      this.$vs.loading.close();
    },
    Back() {
      this.$router.go(-1);
    },
    fetchData() {
      this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var user = {};
      user.PhoneNo = this.$route.params.PhoneNo;
      this.$store
        .dispatch("User/fetchUserDetailsList", user)
        .then(response => {
          if (response.data != null) {
            this.OldAccountStatus = response.data.AccountStatus;
            this.FormData = response.data;
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            this.ID_Not_Found = true;
            this.FormData = null;
          }
        })
        .catch(err => {
          if (err.status === 400) {
            this.$vs.loading.close();
            window.showError();
            return;
          } else if (err.status === 404) {
            this.$vs.loading.close();
            window.showError();
            return;
          }
          console.error(err);
        });
    }
  },
  created() {
    if (!moduleAuth.isRegistered) {
      this.$store.registerModule("User", moduleAuth);
      moduleAuth.isRegistered = true;
    }
    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
