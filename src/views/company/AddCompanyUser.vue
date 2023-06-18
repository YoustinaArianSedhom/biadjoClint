<template>
  <div
    class="flex w-full vx-row no-gutter items-center justify-center"
    id="page-forgetPass"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <form>
        <vx-card>
          <div slot="no-body" class="full-page-bg-color pb-4">
            <div class="vx-row no-gutter justify-center items-center">
              <div class="mr-2 ml-2 mt-8"></div>
              <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                <div class="px-2 pt-8 login-tabs-container">
                  <div class="w-full" v-if="find == true">
                    <div class="mb-6 mt-1 w-full">
                      <label class="text-sm opacity-75">{{
                        $t("PhoneNumber")
                      }}</label>
                      <vue-tel-input
                        v-validate="'required'"
                        @change="onChange($event)"
                        v-bind="bindProps"
                        name="PhoneNo"
                        :dir="$vs.rtl ? 'ltr' : 'ltr'"
                        v-model="Model.PhoneNo"
                        :disabled="addNewUser"
                      >
                      </vue-tel-input>
                      <span class="text-danger text-sm">{{
                        errors.first("PhoneNo")
                      }}</span>
                      <span v-if="!isValid" class="text-danger text-sm"
                        >Phone Number Is Not Valid</span
                      >
                    </div>

                    <div
                      class="vx-col w-full "
                      id="account-manage-buttons"
                      v-if="!addNewUser"
                    >
                      <div class="flex flex-wrap m-2">
                        <div class="m-2 mt-2 mr-auto ml-auto">
                          <vs-button
                            class="p-2"
                            v-if="!addNewUser"
                            :disabled="Model.PhoneNo == ''"
                            @click.prevent="Search()"
                          >
                            {{ $t("Continue") }}</vs-button
                          >
                        </div>

                        <div class="m-2 mt-2 mr-auto ml-auto">
                          <vs-button
                            class="p-2"
                            v-if="addUser && !addNewUser"
                            :disabled="Model.PhoneNo == ''"
                            @click.prevent="AddUser()"
                          >
                            {{ $t("AddUser") }}</vs-button
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="find == false">
                    <div class="flex mb-4">
                      <div class="w-2/3 mr-2">
                        <label class="text-sm opacity-75">{{
                          $t("ConfirmationCode")
                        }}</label>
                        <vs-input class=" w-full" v-model="text" name="Text" />
                        <span
                          class="text-danger text-sm"
                          v-show="errors.has('Text')"
                          >{{ errors.first("Text") }}</span
                        >
                      </div>

                      <div class="w-1/3 mt-6">
                        <vs-button
                          style="padding-left: 5px;padding-right: 5px;"
                          class=" w-full"
                          @click.prevent="SendText()"
                          v-show="!IsClicked"
                        >
                          {{ $t("SendText") }}</vs-button
                        >
                        <vs-button v-show="IsClicked" :disabled="disable">
                          {{ minutes }} : {{ seconds }}</vs-button
                        >
                      </div>
                    </div>

                    <div>
                      <div class="w-2/3 mr-2">
                        <label class="text-sm opacity-75">{{
                          $t("AccountType")
                        }}</label>
                        <v-select
                          :reduce="Code => Code.Code"
                          class=" w-full"
                          :options="this.$options.AccountTypeJSON"
                          :dir="$vs.rtl ? 'rtl' : 'ltr'"
                          :get-option-label="option => $t(option.Code)"
                          v-model="AccountType"
                        ></v-select>
                      </div>
                    </div>

                    <div class="flex mb-4">
                      <div class="mr-auto ml-auto bg-grid-color-secondary h-12">
                        <vs-button
                          :disabled="
                            text == '' ||
                              AccountType == '' ||
                              AccountType == null
                          "
                          @click.prevent="AddUserToCompany()"
                        >
                          {{ $t("AddUserToCompany") }}</vs-button
                        >
                      </div>
                    </div>
                  </div>
                  <div v-if="addNewUser">
                    <div class="vx-row m-2 mt-2">
                      <label class="text-sm opacity-75">{{
                        $t("Firstname")
                      }}</label>
                      <vs-input
                        tabindex="0"
                        v-validate="'required|min:3'"
                        name="FirstName"
                        v-model="RegistrationModel.FirstName"
                        class="w-full"
                      />
                      <span class="text-danger text-sm">{{
                        errors.first("FirstName")
                      }}</span>
                    </div>

                    <div class="vx-row m-2 mt-2">
                      <label class="text-sm opacity-75">{{
                        $t("Lastname")
                      }}</label>
                      <vs-input
                        tabindex="1"
                        v-validate="'required|min:3'"
                        name="LastName"
                        v-model="RegistrationModel.LastName"
                        class=" w-full"
                      />
                      <span class="text-danger text-sm">{{
                        errors.first("LastName")
                      }}</span>
                    </div>

                    <div class="vx-row m-2 mt-2">
                      <label class="text-sm opacity-75">{{
                        $t("Email")
                      }}</label>
                      <vs-input
                        v-validate="'required|email'"
                        name="Email"
                        type="email"
                        tabindex="2"
                        v-model="RegistrationModel.Email"
                        class=" w-full"
                      />
                      <span class="text-danger text-sm">{{
                        errors.first("Email")
                      }}</span>
                    </div>

                    <div class="vx-row m-2 mt-2">
                      <label class="text-sm opacity-75">{{
                        $t("Password")
                      }}</label>
                      <vs-input
                        tabindex="3"
                        ref="password"
                        type="password"
                        v-validate.continues="'min:8|max:100'"
                        name="password"
                        v-model="RegistrationModel.Password"
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

                    <div class="vx-row m-2 mt-2">
                      <label class="text-sm opacity-75">{{
                        $t("ConfirmPassword")
                      }}</label>
                      <vs-input
                        type="password"
                        v-validate="'required|min:8|max:100|confirmed:password'"
                        data-vv-as="password"
                        name="confirm_password"
                        tabindex="4"
                        v-model="confirm_password"
                        class="w-full"
                      />
                      <span class="text-danger text-sm">{{
                        errors.first("confirm_password")
                      }}</span>
                    </div>

                    <div class="vx-row m-2 mt-2">
                      <label class="text-sm opacity-75">{{
                        $t("AccountType")
                      }}</label>
                      <v-select
                        tabindex="5"
                        :reduce="Code => Code.Code"
                        class=" w-full"
                        :options="this.$options.AccountTypeJSON"
                        :dir="$vs.rtl ? 'rtl' : 'ltr'"
                        :get-option-label="option => $t(option.Code)"
                        v-model="AccountType"
                      ></v-select>
                    </div>

                    <div class="vx-row m-2 mt-2">
                      <div class="vx-col md:w-1/2 w-full">
                        <div class="vx-row ">
                          <label class="text-sm opacity-75">{{
                            $t("Code")
                          }}</label>
                          <vs-input
                            tabindex="6"
                            class=" w-full mr-2"
                            v-model="text"
                            name="Text"
                          />
                        </div>
                      </div>
                      <div class="vx-col md:w-1/2 w-full">
                        <div class="vx-row mt-5">
                          <vs-button
                            class=" w-full p-2"
                            @click.prevent="SendText()"
                            v-show="!IsClicked"
                          >
                            {{ $t("SendText") }}</vs-button
                          >
                          <vs-button v-show="IsClicked" :disabled="disable">
                            {{ minutes }} : {{ seconds }}</vs-button
                          >
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-wrap justify-between ">
                      <vs-button
                        :disabled="!validateForm"
                        @click="registerUser"
                        class="px-4 w-full md:w-auto mt-5"
                        >{{ $t("Register") }}</vs-button
                      >
                      <vs-button
                        @click="BackToAddUser"
                        type="border"
                        color="warning"
                        icon-pack="feather"
                        class="px-4 w-full md:w-auto mt-5"
                        >{{ $t("Back") }}</vs-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </form>
    </div>
  </div>
</template>

<script>
import moduleCompany from "@/store/company/moduleCompany.js";
import "vue-slider-component/theme/default.css";
import AccountType_JSON from "./../JsonFiles/companyUserUpdateAccountType.json";

export default {
  AccountTypeJSON: AccountType_JSON,
  data() {
    return {
      AccountType: "",
      userInfo: {},
      confirm_password: "",
      RegistrationModel: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PhoneNo: "",
        AccountType: "",
        CountryCode: "",
        Country: "",
        CompanyUser: "false"
        //CompanyId:"0"
      },
      addNewUser: false,
      addUser: false,
      SendOTPModel: { PhoneNo: "", activationCode: "" },
      minutes: 5,
      seconds: 0,
      innerSetInterval: null,
      IsClicked: false,
      disable: true,
      text: "",

      find: true,
      isValid: true,
      Model: { PhoneNo: "" },
      Company: {
        PhoneNo: "",
        CompanyId: "",
        AccountType: ""
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

  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.RegistrationModel.FirstName !== "" &&
        this.RegistrationModel.LastName !== "" &&
        this.RegistrationModel.Email !== "" &&
        this.RegistrationModel.Password == this.confirm_password &&
        this.RegistrationModel.Password != "" &&
        this.text != "" &&
        this.AccountType != "" &&
        this.AccountType != null
      );
    }
  },
  methods: {
    registerUser() {
      if (this.SendOTPModel.activationCode == this.text) {
        this.$vs.loading();
        this.RegistrationModel.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
        this.RegistrationModel.CountryCode = this.userInfo.countrycode;
        this.RegistrationModel.Country = this.userInfo.country;
        this.RegistrationModel.AccountType = this.AccountType;
        this.$store
          .dispatch("auth/RegisterUser", this.RegistrationModel)
          .then(res => {
            if (res.status == 200) {
              if (res.data == "0") {
                this.$vs.loading.close();
                this.$vs.notify({
                  title: "Error",
                  text: "User Exists",
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              } else {
                this.$vs.loading.close();
                //addtocompany
                this.AddUserToCompany();
              }
            }
            this.$vs.loading.close();
          })
          .catch(Error => {
            if (Error.response.status == 400) {
              this.$vs.notify({
                title: "Error",
                text: "Something Went Wrong... Please try again..!",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger"
              });
            }

            this.$vs.loading.close();
          });
      } else {
        window.IncorrectCode();
      }
    },
    BackToAddUser() {
      (this.addNewUser = false), (this.addUser = false), (this.find = true);
      this.$router.push({
        name: "CompanyUsers"
      });
    },
    Search() {
      this.$vs.loading();
      this.$validator.validateAll().then(result => {
        if (result) {
          this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
          this.$store
            .dispatch("Company/CheckPhoneNoExist", this.Model)
            .then(res => {
              if (res.status == 200) {
                if (res.data.result == "true") {
                  this.find = false;
                  this.$vs.loading.close();
                } else {
                  this.addUser = true;
                  window.UserNotFound();
                  this.$vs.loading.close();
                }
                this.$vs.loading.close();
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
    setTimer() {
      this.minutes = 5;
      this.seconds = 0;
    },
    SendText() {
      this.$vs.loading();
      this.SendOTPModel.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      this.SendOTPModel.activationCode = this.randomNumber = Math.floor(
        Math.random() * (9999 - 1001) + 1000
      );

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("Company/SendOTPToUser", this.SendOTPModel)
            .then(res => {
              if (res.status == 200) {
                this.$vs.loading.close();
                this.StartTiming();
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
    StartTiming() {
      this.IsClicked = true;
      this.setTimer();
      this.innerSetInterval = window.setInterval(() => {
        if (this.minutes == 0 && this.seconds == 0) {
          clearInterval(this.innerSetInterval);
          this.IsClicked = false;

          return;
        }

        if (this.seconds > 0) {
          this.seconds = this.seconds - 1;
        } else {
          this.seconds = 59;

          if (this.minutes > 0) {
            this.minutes = this.minutes - 1;
          }
        }
      }, 1000);
    },
    AddUserToCompany() {
      if (this.SendOTPModel.activationCode == this.text) {
        this.$vs.loading();

        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.Company.CompanyId = userInfo.CompanyId;
        this.Company.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
        this.Company.AccountType = this.AccountType;
        this.$store
          .dispatch("Company/AddUserToCompany", this.Company)
          .then(res => {
            if (res.status == 200) {
              this.$vs.loading.close();
              window.showUserAddeddSuccessfuly();
              this.BackToAddUser();
            }
          })
          .catch(err => {
            if (err.status == 400) {
              // if (err.data.error == "Phone Number Exist") {
              //   window.showAlreadyExist();
              //   this.$vs.loading.close();
              // }
              if (err.data.result == "false") {
                this.$vs.loading.close();
                this.$vs.notify({
                  color: "#27ABBE",
                  position: "top-center",
                  title: this.$t("Error"),
                  text: this.$t(err.data.error)
                });
              } else {
                window.showError();
                this.$vs.loading.close();
              }
            } else {
              window.showError();
              this.$vs.loading.close();
            }
          });
      } else {
        window.IncorrectCode();
      }
    },
    AddUser() {
      this.addNewUser = true;
    }
  },
  created() {
    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 250px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
