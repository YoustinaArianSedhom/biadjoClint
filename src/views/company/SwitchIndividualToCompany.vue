<!-- =========================================================================================
  File Name: clientView.vue
  Description: client View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/client/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">
    <form id="user-data" v-if="FormData">
      <vx-card class="mb-base">
        <div class="vx-row">
          <div
            class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
            id="account-info-col-1"
          >
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("CompanyName") }}</label>
              <vs-input
                class="w-full"
                v-model="FormData.CompanyName"
                v-validate="'required'"
                name="CompanyName"
                tabindex="0"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('CompanyName')"
                >{{ errors.first("CompanyName") }}</span
              >
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{
                $t("CompanyPhoneNo")
              }}</label>
              <vue-tel-input
                class="w-full"
                tabindex="1"
                v-model="FormData.CompanyPhoneNo"
                v-validate="'required'"
                name="CompanyPhoneNo"
                :dir="$vs.rtl ? 'ltr' : 'ltr'"
                v-bind="bindProps"
                @onInput="onInput"
                :placeholder="$t('enterphonenumber')"
              >
              </vue-tel-input>
              <span
                v-if="!isValid"
                class="text-danger text-sm"
                v-show="errors.has('CompanyPhoneNo')"
                >{{ errors.first("CompanyPhoneNo") }}</span
              >
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Email") }}</label>
              <vs-input
                tabindex="2"
                class="w-full"
                v-model="FormData.Email"
                v-validate="'required|email'"
                name="Email"
              />
              <span class="text-danger text-sm" v-show="errors.has('Email')">{{
                errors.first("Email")
              }}</span>
            </div>
          </div>

          <div
            class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
            id="account-info-col-2"
          >
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("State") }}</label>
              <v-select
                :get-option-label="option => $t(option[StateWithLocale])"
                class="mt-1 w-full p-0"
                v-validate="'required|min:3'"
                name="State"
                tabindex="3"
                v-model="FormData.State"
                @input="GetCityList(FormData.State)"
                :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
                :options="State"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <span class="text-danger text-sm" v-show="errors.has('State')">{{
                errors.first("State")
              }}</span>
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75"> {{ $t("City") }}</label>
              <v-select
                :get-option-label="option => $t(option[CityWithLocale])"
                class="mt-1 w-full p-0"
                v-validate="'required|min:3'"
                name="City"
                v-model="FormData.City"
                :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
                :options="City"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />

              <span class="text-danger text-sm" v-show="errors.has('City')">{{
                errors.first("City")
              }}</span>
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Address") }}</label>
              <vs-input
                class="w-full"
                tabindex="5"
                v-model="FormData.Address"
                v-validate="'required'"
                name="Address"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Address')"
                >{{ errors.first("Address") }}</span
              >
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("ZipCode") }}</label>

              <vs-input
                class="w-full"
                tabindex="6"
                v-model="FormData.ZibCode"
                name="ZibCode"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('ZibCode')"
                >{{ errors.first("ZibCode") }}</span
              >
            </div>
          </div>
          <div class="vx-row w-full m-2" id="account-manage-buttons">
            <div class="mb-2 mt-2 ">
              <vs-button
                class="mr-4"
                @click="save_changes"
                :disabled="!validateForm"
              >
                {{ $t("SaveChanges") }}
              </vs-button>
            </div>
            <div class="mb-2 mt-2 ">
              <vs-button
                class="mr-4"
                type="border"
                color="warning"
                icon-pack="feather"
                @click="Back"
                >{{ $t("Back") }}</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
    </form>
  </div>
</template>

<script>
import moduleCompany from "@/store/company/moduleCompany.js";
import moduleGeneral from "@/store/General/moduleGeneral.js";

export default {
  data() {
    return {
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US"],
        onlyCountries: [],
        ignoredCountries: [],
        placeholder: "",
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        }
      },
      isValid: true,
      isThisValid: true,
      FormData: {}
    };
  },
  computed: {
    State() {
      return this.$store.state.General.State;
    },
    City() {
      return this.$store.state.General.City;
    },
    StateWithLocale() {
      let State = "admin1Name_en";
      if (this.$i18n.locale == "ar") {
        State = "admin1Name_ar";
      }
      return State;
    },
    CityWithLocale() {
      let City = "admin2Name_en";
      if (this.$i18n.locale == "ar") {
        City = "admin2Name_ar";
      }
      return City;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.FormData.CompanyName != "" &&
        this.FormData.CompanyName != null &&
        this.FormData.CompanyPhoneNo != "" &&
        this.FormData.CompanyPhoneNo != null &&
        // this.FormData.UserPhoneNo != "" &&
        // this.FormData.UserPhoneNo != null &&
        this.FormData.Email != "" &&
        this.FormData.Email != null &&
        this.FormData.Address != "" &&
        this.FormData.Address != null &&
        this.FormData.City != "" &&
        this.FormData.City != null &&
        this.FormData.State != "" &&
        this.FormData.State != null &&
        this.isValid == true &&
        this.isThisValid == true
      );
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    GetCityList(State) {
      this.$vs.loading();
      let model = {};
      model.StateName = State;
      this.$store
        .dispatch("General/GetCityList", model)
        .then(() => {
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },

    Back() {
      this.$router.go(-1);
    },

    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      this.FormData.UserPhoneNo = JSON.parse(
        localStorage.getItem("userInfo")
      ).PhoneNumber;
      this.FormData.UserPhoneNo = this.FormData.UserPhoneNo.replace(/\s/g, "");
      this.FormData.CompanyPhoneNo = this.FormData.CompanyPhoneNo.replace(
        /\s/g,
        ""
      );
      this.$store
        .dispatch("Company/ChangeUserAccountToCompany", this.FormData)
        .then(response => {
          if (response.status == 200) {
            if (response.data == 1) {
              this.$vs.loading.close();
              window.showSuccess();
              this.$store.dispatch("auth/refreshCurrentUser");
              this.$router.push("/").then(() => {
                location.reload("/");
              });
            } else {
              this.$vs.loading.close();
              window.showError();
            }
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },
  created() {
    let AccountType = JSON.parse(localStorage.getItem("userInfo")).AccountType;
    if (AccountType != "AT0") {
      this.$router.push({ name: "home" });
    } else {
      if (!moduleCompany.isRegistered) {
        this.$store.registerModule("Company", moduleCompany);
        moduleCompany.isRegistered = true;
      }
      if (!moduleGeneral.isRegistered) {
        this.$store.registerModule("General", moduleGeneral);
        moduleGeneral.isRegistered = true;
      }

      this.$store.dispatch("General/GetStateList");

      this.FormData.UserPhoneNo = JSON.parse(
        localStorage.getItem("userInfo")
      ).PhoneNumber;
    }
  }
};
</script>
