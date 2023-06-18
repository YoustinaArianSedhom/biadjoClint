<template>
  <div>
    <form onsubmit="return false">
      <div class="vx-row no-gutter justify-center items-center">
        <!-- <div class="mr-2 ml-2 mt-8">
        <span class="text-primary text-lg">{{ $t("EnterRequiredData") }}</span>
      </div> -->
      </div>
      <div class=" mb-6 mt-1 w-full" v-if="isLogin == false">
        <div class="vx-col w-full mt-6">
          <label class="text-sm opacity-75">{{ $t("Country") }}</label>
          <v-select
            v-validate="'required'"
            label="Country"
            class=" w-full"
            name="Country"
            @input="CheckCountry"
            v-model="Model.CountryCode"
            :reduce="CountryCode => CountryCode.CountryCode"
            :options="Country"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            style="padding-bottom: 0 !important"
          />
          <span v-if="IsEmpty" class="text-danger text-sm">{{
            this.CountryErrorMessage
          }}</span>
        </div>
      </div>
      <div class=" mb-6 mt-1 w-full" v-if="isLogin == false">
        <label class="text-sm opacity-75">{{ $t("Phone") }}</label>
        <vue-tel-input
          tabindex="0"
          v-validate="'required'"
          @change="onChange($event)"
          @onInput="onInput"
          :dir="$vs.rtl ? 'ltr' : 'ltr'"
          v-bind="bindProps"
          name="PhoneNo"
          v-model="Model.PhoneNo"
        >
        </vue-tel-input>

        <span class="text-danger text-sm">{{ errors.first("PhoneNo") }}</span>
        <span v-if="!isValid" class="text-danger text-sm">{{
          $t("PhoneNumberIsNotValid")
        }}</span>

        <div class=" flex float-right mt-10 ">
          <vs-button :disabled="!validateForm" @click.prevent="Search()">
            {{ $t("Continue") }}</vs-button
          >
        </div>
      </div>

      <div class=" mb-6 mt-1 w-full" v-if="isLogin == true">
        <div>
          <label class="text-sm opacity-75">{{ $t("Password") }}</label>
          <vs-input
            v-validate="'required|min:8|max:100'"
            tabindex="1"
            type="password"
            name="password"
            icon-no-border
            icon="icon icon-lock"
            icon-pack="feather"
            v-model="Model.Password"
            class="w-full "
          />
          <span class="text-danger text-sm">{{
            errors.first("password")
          }}</span>
        </div>
        <div class="mt-4 mb-4">
          <router-link
            :to="{
              path:
                '/user/forgetPassword/forgetPassword?id=' +
                Model.PhoneNo.replace('+', ''),

              // name: 'user-forgetpassword',
              params: { PhoneNo: Model.PhoneNo }
            }"
            >{{ $t("ForgotPassword") }}</router-link
          >
        </div>

        <div class="vx-row flex-wrap justify-between m-2 ">
          <vs-button type="border" class="p-4" @click="Back">{{
            $t("Back")
          }}</vs-button>
          <vs-button
            :disabled="Model.PhoneNo == '' || !isValid || this.errors.any()"
            @click="loginJWT"
            class="p-4"
          >
            {{ $t("Login") }}</vs-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
//import moduleUser from "@/store/user/moduleUser.js";
import axios from "@/axios.js";
import moduleGeneral from "@/store/General/moduleGeneral.js";
import "vue-slider-component/theme/default.css";
import Servers from "@/http/axios/Servers.json";
export default {
  data() {
    return {
      isLogin: false,
      minutes: 5,
      seconds: 0,
      IsEmpty: false,
      disable: true,
      text: "",
      isValid: true,
      Model: { PhoneNo: "", Password: "", CountryCode: "" },
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "",
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US"],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        },
        inputOptions: {
          showDialCode: false,
          tabindex: 0
        }
      }
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.PhoneNo != null &&
        this.Model.PhoneNo != "" &&
        this.Model.CountryCode != null &&
        this.Model.CountryCode != "" &&
        this.isValid == true
      );
    },
    Country() {
      return this.$store.state.General.Country;
    }
  },
  watch: {
    $route() {
      if (this.Dropdown) {
        this.Dropdown = false;
      }
    }
  },
  methods: {
    CheckCountry() {
      if (this.Model.CountryCode == "" || this.Model.CountryCode == null) {
        this.CountryErrorMessage = "This country field is required";
        this.IsEmpty = true;
        return false;
      } else {
        this.IsEmpty = false;
      }
      return true;
    },
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    Search() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      var SelectedCountry = this.Country.find(
        Country => Country.CountryCode === this.Model.CountryCode
      );

      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.Model.CountryCode == "EG") {
            localStorage.setItem("URL", Servers.EG_Server);
            axios.defaults.baseURL = Servers.EG_Server;
          }
          var checkPhone = {};
          checkPhone.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");

          this.$store
            .dispatch("auth/CheckPhoneNoExist", checkPhone)
            .then(response => {
              if (response.status == 200) {
                if (response.data.result == "true") {
                  this.isLogin = true;
                  this.$vs.loading.close();
                } else {
                  this.$vs.loading.close();
                  this.$router.push({
                    name: "user-register",
                    params: {
                      PhoneNo: this.Model.PhoneNo,
                      CountryCode: this.Model.CountryCode,
                      Country: SelectedCountry.Country
                    }
                  });
                }
              }
            })
            .catch(() => {
              window.showError();
              this.$vs.loading.close();
            });
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
    },
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: this.$t("LoginAttempt"),
          text: this.$t("Youarealreadyloggedin"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });
        this.$router.push("/");
        return false;
      }
      return true;
    },
    loginJWT() {
      //

      if (!this.checkLogin()) return;
      if (!this.CheckCountry()) {
        return;
      }

      // Loading
      this.$vs.loading();

      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");

      this.$store
        .dispatch("auth/loginJWT", this.Model)
        .then(response => {
          if (response.status == 200) {
            if (response.data.Error == "") {
              var phone = {};
              this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
              phone.PhoneNo = this.Model.PhoneNo;
              this.$store
                .dispatch("auth/fetchUserDetails", phone)
                .then(response => {
                  this.$vs.loading.close();
                  if (response.data.AccountStatus === "AS1") {
                    this.$acl.change(response.data.AccountType);
                    this.$router
                      .push(this.$router.currentRoute.query.to || "/")
                      .then(() => location.reload("/"));
                  } else {
                    window.showNoRightAccessToLogin();
                    this.$store.dispatch("auth/logout");
                  }
                })
                .catch(() => {
                  this.$vs.loading.close();
                  window.showError();
                });
              this.$vs.loading.close();
            } else if (response.data.Error == "Password") {
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("InvallidPassword"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger"
              });
            } else {
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("ErroSomethingWentWrongr"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warn"
              });
            }
            this.$vs.loading.close();
          }
        })
        .catch(Error => {
          if (Error.response.status == 400) {
            this.$vs.loading.close();
          }
          this.$vs.loading.close();
        });
    },
    Back() {
      this.isLogin = false;
    }
  },

  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }
    this.$store.dispatch("General/fetchAllCountriesList");
    setInterval(() => {
      if (navigator.onLine && this.$store.state.General.Country.length == 0) {
        this.$store.dispatch("General/fetchAllCountriesList");
      }
    }, 6000);
    this.checkLogin();
  }
};
</script>
