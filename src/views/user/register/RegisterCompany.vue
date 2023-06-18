<template>
  <div class="clearfix regist-tabs-container">
    <form-wizard
      color="rgba(var(--vs-primary), 1)"
      :title="null"
      :subtitle="null"
    >
      <!-- tab 1 content -->
      <tab-content
        title="Step 1"
        class="mb-5"
        shape="square"
        :before-change="validateStep1"
      >
        <form data-vv-scope="step-1">
          <div class="vx-row mb-4">
            <label class="text-sm opacity-75">{{ $t("CompanyName") }}</label>
            <vs-input
              v-validate="'required|min:3'"
              tabindex="0"
              name="CompanyName"
              v-model="Model.CompanyName"
              class="w-full"
            />

            <span class="text-danger">{{
              errors.first("step-1.CompanyName")
            }}</span>
          </div>

          <div class="vx-row mb-4" v-if="userLocation.Address == ''">
            <label class="text-sm opacity-75">{{ $t("Address") }}</label>
            <vs-input
              name="Address"
              tabindex="1"
              v-model="Model.Address"
              class="w-full"
              v-validate="'required|min:3'"
            />
            <span class="text-danger">{{
              errors.first("step-1.Address")
            }}</span>
          </div>

          <div class="vx-row">
            <label class="text-sm opacity-75">{{ $t("State") }}</label>
            <v-select
              :get-option-label="option => $t(option[StateWithLocale])"
              class="mt-1 w-full p-0"
              v-validate="'required|min:3'"
              name="State"
              tabindex="3"
              v-model="Model.State"
              @input="GetCityList(Model.State)"
              :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
              :options="State"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <span class="text-danger text-sm" v-show="errors.has('State')">{{
              errors.first("State")
            }}</span>
            <!-- <vs-input
              name="State"
              tabindex="3"
              v-model="Model.State"
              class=" w-full"
              v-validate="'required|min:3'"
            />
            <span class="text-danger">{{ errors.first("step-1.State") }}</span> -->
          </div>

          <div class="vx-row">
            <label class="text-sm opacity-75"> {{ $t("City") }}</label>
            <v-select
              :get-option-label="option => $t(option[CityWithLocale])"
              class="mt-1 w-full p-0"
              v-validate="'required|min:3'"
              name="City"
              v-model="Model.City"
              :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
              :options="City"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />

            <span class="text-danger text-sm" v-show="errors.has('City')">{{
              errors.first("City")
            }}</span>
            <!-- <vs-input
              tabindex="2"
              name="City"
              v-model="Model.City"
              class=" w-full"
              v-validate="'required|min:3'"
            />
            <span class="text-danger">{{ errors.first("step-1.City") }}</span> -->
          </div>
        </form>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content title="Step 2">
        <form>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
              <div class="vx-row">
                <label class="text-sm opacity-75">{{ $t("Firstname") }}</label>
                <vs-input
                  tabindex="4"
                  v-validate="'required|alpha_dash|min:3'"
                  name="FirstName"
                  v-model="Model.FirstName"
                  class="w-full mr-2"
                />
                <span class="text-danger text-sm">{{
                  errors.first("FirstName")
                }}</span>
              </div>
            </div>

            <div class="vx-col md:w-1/2 w-full mb-4">
              <div class="vx-row">
                <label class="text-sm opacity-75">{{ $t("Lastname") }}</label>
                <vs-input
                  tabindex="5"
                  v-validate="'required|alpha_dash|min:3'"
                  name="LastName"
                  v-model="Model.LastName"
                  class="w-full"
                />
                <span class="text-danger text-sm">{{
                  errors.first("LastName")
                }}</span>
              </div>
            </div>
          </div>

          <div class="vx-row mb-4">
            <label class="text-sm opacity-75">{{ $t("Email") }}</label>
            <vs-input
              tabindex="6"
              v-validate="'required|email'"
              name="Email"
              type="email"
              v-model="Model.Email"
              class="w-full"
            />
            <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
          </div>

          <div class="vx-row mb-4">
            <label class="text-sm opacity-75">{{ $t("Password") }}</label>
            <vs-input
              tabindex="7"
              ref="password"
              type="password"
              v-validate.continues="'min:8|max:100'"
              name="password"
              v-model="Model.Password"
              class="w-full"
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

          <div class="vx-row mb-4">
            <label class="text-sm opacity-75">{{
              $t("ConfirmPassword")
            }}</label>
            <vs-input
              tabindex="8"
              type="password"
              v-validate="'required|min:8|max:10|confirmed:password'"
              data-vv-as="password"
              name="confirm_password"
              v-model="confirm_password"
              class="w-full"
            />
            <span class="text-danger text-sm">{{
              errors.first("confirm_password")
            }}</span>
          </div>
        </form>
      </tab-content>

      <vs-button slot="prev" class="px-4 w-full md:w-auto ">{{
        $t("Back")
      }}</vs-button>
      <vs-button slot="next" class="px-4 w-full md:w-auto">{{
        $t("Next")
      }}</vs-button>
      <vs-button
        slot="finish"
        class="px-4 w-full md:w-auto float-right "
        @click="registerCompany"
        :disabled="!validateForm"
        >{{ $t("Create") }}</vs-button
      >
    </form-wizard>
    <!-- <div>
      <vs-button
        type="border"
        to="/user/login/login"
        class="px-4 w-full md:w-auto float-right"
        >{{ $t("BackToLogin") }}</vs-button
      >
    </div> -->
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import moduleGeneral from "@/store/General/moduleGeneral.js";
/* eslint-disable */
export default {
  props: {
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      userLocation: { Address: "", City: "", State: "", ZibCode: "" },
      GetLocationAllowed: false,
      //CompanyNameErrorMessage:"",
      //IsEmpty: false,
      //IsEmptyCompanyName:false,
      EmailObj: {
        Email: ""
      },
      confirm_password: "",
      isMounted: false,
      isTermsConditionAccepted: true,
      placement: "top",
      Model: {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Country: "",
        CountryCode: "",
        AccountType: "AT3",
        Password: "",
        CompanyName: "",
        Address: "",
        City: "",
        State: "",
        ZibCode: ""
      },
      isValid: true,
      NotAllowedToDoARequest: false
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.FirstName !== "" &&
        this.Model.LastName !== "" &&
        this.Model.Email !== "" &&
        this.Model.Password != "" &&
        this.Model.Password == this.confirm_password &&
        this.Model.CompanyName !== "" &&
        this.Model.Address !== "" &&
        this.Model.State != "" &&
        this.Model.City != ""
      );
    },
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
    }
  },
  methods: {
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

    initLocationSearch() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          navigator.permissions.query({ name: "geolocation" }).then(result => {
            if (result.state === "granted") {
              this.GetLocationAllowed = true;

              var latlng = {
                lat: parseFloat(position.coords.latitude),
                lng: parseFloat(position.coords.longitude)
              };
              var geocoder = new google.maps.Geocoder();

              geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                    if (results[0].geometry.location) {
                      results[0].address_components.forEach(element => {
                        if (element.types.includes("country")) {
                          this.userLocation.Country = element.long_name;
                          this.userLocation.CountryCode = element.short_name;
                        }
                        if (
                          element.types.includes("administrative_area_level_1")
                        ) {
                          this.userLocation.State = element.long_name;
                        }
                        if (
                          element.types.includes("locality") ||
                          element.types.includes("administrative_area_level_2")
                        ) {
                          this.userLocation.City = element.long_name;
                        }
                        if (
                          element.types.includes("administrative_area_level_3")
                        ) {
                          this.userLocation.Address = element.long_name;
                        }
                        if (element.types.includes("postal_code")) {
                          this.userLocation.ZibCode = element.long_name;
                        }
                      });

                      this.Model.State = this.userLocation.State.slice(
                        0,
                        this.userLocation.State.indexOf("Governorate") - 1
                      );
                      this.Model.City = this.userLocation.City;
                      this.Model.Address = this.userLocation.Address;
                      this.Model.ZibCode = this.userLocation.ZibCode;
                    }
                  }
                }
              });

              //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            } else if (result.state === "prompt") {
              this.GetLocationAllowed - false;
            } else if (result.state === "denied") {
              alert("Please enable location to get your coords");
              this.$vs.loading({
                type: "radius",
                text: this.$t("AllowLocation"),
                color: "#EA5455",
                background: "rgb(255, 255, 255)"
              });
            }
          });
        });
      }
    },

    validateStep1() {
      //debugger
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-1").then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
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
    registerCompany() {
      if (!this.validateForm || !this.checkLogin()) {
        window.showFillData();

        return;
      }

      this.$vs.loading();
      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");

      this.$store
        .dispatch("auth/registerCompany", this.Model)
        .then(() => {
          this.$vs.loading.close();
          this.$router.push("/user/login/login");
        })
        .catch(Error => {
          if (Error.status == 400) {
            this.$vs.notify({
              title: this.$t("Error"),
              text: this.$t("ErroSomethingWentWrongr"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "warn"
            });
            this.$vs.loading.close();
          } else {
            this.$vs.notify({
              title: this.$t("Error"),
              text: this.$t("ErroSomethingWentWrongr"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "warn"
            });
            this.$vs.loading.close();
          }
          this.$vs.loading.close();
        });
    }
  },
  mounted() {},
  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }

    this.$store.dispatch("General/GetStateList");
    window.isUserAllowedToRegist(
      this.$route.params.PhoneNo,
      this.$route.params.CountryCode,
      this.$route.params.Country
    );
    this.Model.PhoneNo = this.$route.params.PhoneNo;
    this.Model.Country = this.$route.params.Country;
    this.Model.CountryCode = this.$route.params.CountryCode;

    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  components: {
    FormWizard,
    TabContent
  }
};
</script>

<style lang="scss">
.regist-tabs-container {
  min-height: 500px;
}
</style>
