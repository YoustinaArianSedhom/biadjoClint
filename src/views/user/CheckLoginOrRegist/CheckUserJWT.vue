<template>
  <div>
    <vx-card>
      <div class="vx-row no-gutter justify-center items-center">
        <div class="mr-2 ml-2 mt-8">
          <span class="text-primary text-lg">{{ $t("CheckUserTitle") }}</span>
        </div>
      </div>
      <div class=" mb-6 mt-1 w-full">
        <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
        <vue-tel-input
          v-validate="'required'"
          @change="onChange($event)"
          :dir="$vs.rtl ? 'ltr' : 'ltr'"
          @onInput="onInput"
          v-bind="bindProps"
          name="PhoneNo"
          :placeholder="$t('enterphonenumber')"
          v-model="Model.PhoneNo"
        >
        </vue-tel-input>
        <span class="text-danger text-sm">{{ errors.first("PhoneNo") }}</span>
        <span v-if="!isValid" class="text-danger text-sm"
          >Phone Number Is Not Valid</span
        >
      </div>

      <div class=" mb-6 mt-1 w-full" v-if="isLogin == true">
        <label class="text-sm opacity-75">{{ $t("Password") }}</label>
        <vs-input
          v-validate.continues="'min:8|max:100'"
          type="password"
          name="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          v-model="Model.Password"
          class="w-full "
        />
        <ul>
          <li
            class="text-danger text-sm"
            v-for="error in errors.collect('password')"
            :key="error"
          >
            {{ error }}
          </li>
        </ul>
      </div>

      <div class="w-1/3 mt-4 ml-auto " v-if="isLogin == false">
        <vs-button
          :disabled="Model.PhoneNo == '' || !isValid"
          @click.prevent="Search()"
          class=""
        >
          {{ $t("Find") }}</vs-button
        >
      </div>

      <div class="w-1/3 mt-4 ml-auto " v-if="isLogin == true">
        <vs-button
          :disabled="Model.PhoneNo == '' || !isValid || this.errors.any()"
          @click="loginJWT"
          class=""
        >
          {{ $t("Login") }}</vs-button
        >
      </div>
    </vx-card>
  </div>
</template>

<script>
//import moduleUser from "@/store/user/moduleUser.js";
import axios from "@/axios.js";
import Servers from "@/http/axios/Servers.json";
import "vue-slider-component/theme/default.css";

export default {
  components: {},

  isSearchStalled: true,
  Autocomplete: {
    name: "autocomplete",
    template: "#autocomplete",
    props: {
      Countries: {
        type: Array,
        required: false,
        default: () => []
      },
      isAsync: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  },
  data() {
    return {
      isLogin: false,
      minutes: 5,
      seconds: 0,
      innerSetInterval: null,
      IsClicked: false,
      disable: true,
      text: "",
      ApiDataText: "",
      find: true,
      right: false,
      isValid: true,
      Model: { PhoneNo: "", Password: "" },
      Company: {
        PhoneNo: "",
        CompaneyId: ""
      },
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
        },
        inputOptions: {
          showDialCode: false,
          tabindex: 0
        }
      }
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
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    Search() {
      //
      this.$vs.loading();
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.bindProps.country.iso2 == "EG") {
            localStorage.setItem("URL", Servers.EG_Server);
            axios.defaults.baseURL = Servers.EG_Server;
          }
          var checkPhone = {};
          this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
          checkPhone.PhoneNo = this.Model.PhoneNo;
          this.$store
            .dispatch("auth/CheckPhoneNoExist", checkPhone)
            .then(res => {
              if (res.status == 200) {
                if (res.data.result == "true") {
                  this.isLogin = true;
                  this.$vs.loading.close();
                } else {
                  this.$vs.loading.close();
                  this.$router.push("/user/register/register");
                }
              }
            })
            .catch(err => {
              window.showError();
              this.$vs.loading.close();
              console.error(err);
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
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });

        return false;
      }
      return true;
    },
    loginJWT() {
      //

      if (!this.checkLogin()) return;
      // Loading
      this.$vs.loading();

      this.$store
        .dispatch("auth/loginJWT", this.Model)
        .then(res => {
          if (res.status == 200) {
            if (res.data.Error == "") {
              //get user data
              //----------------------------------------------------------------------------------------------------------
              var phone = {};
              phone.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
              this.$store
                .dispatch("auth/fetchUserDetails", phone)
                .then(() => {
                  this.$vs.loading.close();
                  if (this.$store.state.AppActiveUser.AccountStatus === "AS1") {
                    this.$router.push(
                      this.$router.currentRoute.query.to || "/"
                    );
                  } else {
                    window.showNoRightAccessToLogin();
                  }
                })
                .catch(() => {
                  this.$vs.loading.close();
                  window.showError();
                });
              //--------------------------------------------------------------------------------------------------------

              this.$vs.loading.close();
            } else if (res.data.Error == "Password") {
              this.$vs.notify({
                title: "Error",
                text: "Invalid Password... Please try again..!",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger"
              });
            } else {
              this.$vs.notify({
                title: "Error",
                text: "Something Went Wrong... Please try again..!",
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
    }
  },

  created() {}
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 255px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
