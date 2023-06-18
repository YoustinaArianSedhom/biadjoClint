<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="ID_Not_Found"
    >
      <span>company record with id: {{ userInfo.CompaneyId }} not found. </span>
    </vs-alert>

    <div id="company-data" v-if="company_data != undefined">
      <vx-card class="mb-base" id="account-info">
        <div class="vx-row">
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="company_data.CompanyLogo" class="rounded w-full" />
            </div>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("CompanyName") }}</td>
                <td>{{ company_data.CompanyName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ company_data.Email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>{{ company_data.PhoneNo }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CompanyID") }}</td>
                <td>{{ company_data.id }}</td>
              </tr>
              <!-- <tr>
                <td class="font-semibold">{{ $t("CustomerId") }}</td>
                <td>{{ company_data.CustomerId }}</td>
              </tr> -->
              <tr>
                <td class="font-semibold">{{ $t("ZipCode") }}</td>
                <td>{{ company_data.ZibCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("RegistrationDate") }}</td>
                <td>
                  {{
                    company_data.RegistrationDate
                      | formatDate("yyyy/MM/dd HH:mm")
                  }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(company_data.Status) }}</td>
              </tr>
            </table>
          </div>
          <!-- <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">
                  {{ $t("CommercialRegistrationID") }}
                </td>
                <td>{{ company_data.CommercialRegistrationID }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("TaxID") }}</td>
                <td>{{ company_data.TaxID }}</td>
              </tr>
             
               <tr>
                <td class="font-semibold">{{ $t("WalletCountryCode") }}</td>
                <td>{{ company_data.WalletCountryCode }}</td>
              </tr> 
            
           
            </table>
          </div> -->

          <div class="vx-col flex-1" id="account-info-col-3">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("Address") }}</td>
                <td>{{ company_data.Address }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>{{ company_data.State }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>{{ company_data.City }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ company_data.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ company_data.countrycode }}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="vx-row flex-wrap m-2">
              <div class="mb-2 mt-2">
                <input
                  type="file"
                  class="hidden"
                  ref="updateImgInput"
                  @change="updateCurrImg"
                  accept="image/*"
                />
                <vs-button
                  :disabled="
                    userInfo.AccountType != 'AT1' &&
                      userInfo.AccountType != 'AT3'
                  "
                  icon-pack="feather"
                  icon="icon-user"
                  @click="$refs.updateImgInput.click()"
                  class="mr-4 p-4"
                  >{{ $t("UpdateLogo") }}</vs-button
                >
              </div>

              <div class="mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="mr-4 p-4"
                >
                  {{ $t("Back") }}</vs-button
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
import moduleCompany from "@/store/company/moduleCompany.js";
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";
var CryptoJS = require("crypto-js");
export default {
  data() {
    return {
      company_data: {},
      ID_Not_Found: false,
      userInfo: {}
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    async updateCurrImg(input) {
      this.$vs.loading();
      if (input.target.files && input.target.files[0]) {
        const file = event.target.files[0];
        var newFile = await FileEncryptionHandler.encrypt(file);
        this.$store
          .dispatch("Company/UploadCompanyLogo", {
            params: {
              CompanyId: this.userInfo.CompanyId,
              file: newFile
            }
          })
          .then(response => {
            this.company_data.CompanyLogo = FileEncryptionHandler.decrypt(
              response.data
            );
            // this.company_data.CompanyLogo = res.data;
            this.$vs.loading.close();
          })
          .catch(() => {
            this.$vs.loading.close();
            window.showError();
          });
      }
    },
    fetchData() {
      this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var JsonValue = {};
      JsonValue.CompanyId = this.userInfo.CompanyId;
      this.$store
        .dispatch("Company/fetchCompanyDetails", JsonValue)
        .then(response => {
          this.company_data = response.data;
          this.$vs.loading.close();
          if (response.data.CompanyLogo) {
            this.company_data.CompanyLogo = FileEncryptionHandler.decrypt(
              JSON.parse(response.data.CompanyLogo)
            );
          }
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.ID_Not_Found = true;
            return;
          }
          this.$vs.loading.close();
          console.error(err);
        });
    }
  },
  created() {
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

#page-client-view {
  table {
    td {
      vertical-align: baseline !important;
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
