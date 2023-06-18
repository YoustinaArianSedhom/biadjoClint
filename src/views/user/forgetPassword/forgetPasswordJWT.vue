<template>
  <div>
    <div class="vx-row no-gutter justify-center items-center"></div>
    <div class="w-full" v-if="vertified == false">
      <div class="vx-row mb-4">
        <div class="vx-col w-full mb-1 md:w-2/3 lg:w-2/4 xl:w-3/5  ">
          <label class="text-sm opacity-75">{{ $t("ConfirmationCode") }}</label>
          <vs-input class=" w-full" v-model="text" name="Text" />
          <span class="text-danger text-sm" v-show="errors.has('Text')">{{
            errors.first("Text")
          }}</span>
        </div>

        <div class="vx-col w-full  md:w-1/3 lg:w-2/4 xl:w-2/5 ">
          <vs-button
            @click.prevent="SendText()"
            type="flat"
            class="px-4 mt-6 md:w-auto text-dark font-semibold"
            v-show="!IsClicked"
          >
            {{ $t("ReSendCode") }}</vs-button
          >
          <vs-button
            type="flat"
            class="px-4 mt-6 md:w-auto text-dark text-xl font-semibold"
            v-show="IsClicked"
            :disabled="disable"
          >
            {{ minutes }} : {{ seconds }}</vs-button
          >
        </div>
      </div>
      <div class="flex float-right">
        <vs-button :disabled="text == ''" @click.prevent="VertifyCode()">
          {{ $t("Verfiy") }}</vs-button
        >
      </div>
    </div>

    <div v-else>
      <div class="vx-row">
        <label class="text-sm opacity-75">{{ $t("Password") }}</label>
        <vs-input
          ref="password"
          type="password"
          v-validate.continues="'min:8|max:100'"
          name="password"
          v-model="Model.NewPass"
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

      <div class="vx-row">
        <label class="text-sm opacity-75">{{ $t("ConfirmPassword") }}</label>
        <vs-input
          type="password"
          v-validate="'required|min:8|max:100|confirmed:password'"
          data-vv-as="password"
          name="confirm_password"
          v-model="confirm_password"
          class="w-full"
        />
        <span class="text-danger text-sm">{{
          errors.first("confirm_password")
        }}</span>
      </div>

      <div class="flex float-right mt-6">
        <!-- <div class="flex flex-wrap justify-between m-2 "> -->
        <!-- <vs-button type="border" to="/user/login/login">{{
          $t("BackToLogin")
        }}</vs-button> -->
        <vs-button :disabled="!validateForm" @click="ResetPassword" class="">
          {{ $t("ResetPassword") }}</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
//import moduleUser from "@/store/user/moduleUser.js";
//import axios from "@/axios.js";

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
      confirm_password: "",
      vertified: false,
      minutes: 5,
      seconds: 0,
      innerSetInterval: null,
      IsClicked: true,
      disable: true,
      text: "",
      ApiDataText: "",
      find: true,
      right: false,
      isValid: true,
      Model: {
        NewPass: "",
        PhoneNo: ""
      },
      SendOTPModel: { PhoneNo: "", activationCode: "" }
    };
  },
  watch: {
    $route() {
      if (this.Dropdown) {
        this.Dropdown = false;
      }
    }
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.PhoneNo !== "" &&
        this.Model.NewPass == this.confirm_password &&
        this.Model.NewPass != ""
      );
    }
  },
  methods: {
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
    ResetPassword() {
      if (!this.validateForm || !this.checkLogin()) {
        window.showFillData();
        return;
      }

      this.$vs.loading();

      this.$store
        .dispatch("auth/ForgotPassword", this.Model)
        .then(res => {
          if (res.status == 200) {
            if (res.data == "1") {
              this.$vs.loading.close();
              this.$router.push("/user/login/login");
            } else {
              this.$vs.loading.close();
            }
          }
          this.$vs.loading.close();
        })
        .catch(Error => {
          if (Error.status == 400) {
            this.$vs.notify({
              title: this.$t("Error"),
              text: this.$t("ErroSomethingWentWrongr"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }

          this.$vs.loading.close();
        });
    },

    setTimer() {
      this.minutes = 5;
      this.seconds = 0;
    },
    SendText() {
      this.$vs.loading();
      this.SendOTPModel.activationCode = this.randomNumber = Math.floor(
        Math.random() * (9999 - 1001) + 1000
      );
      this.SendOTPModel.PhoneNo = this.SendOTPModel.PhoneNo.replace(/\s/g, "");

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("auth/SendOTPToUser", this.SendOTPModel)
            .then(res => {
              if (res.status == 200) {
                //this.ApiDataText = res.data;
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
    VertifyCode() {
      if (
        this.SendOTPModel.activationCode == this.text &&
        this.SendOTPModel.activationCode != "" &&
        this.SendOTPModel.activationCode != null
      ) {
        this.vertified = true;
      } else {
        window.IncorrectCode();
        this.vertified = false;
      }
    }
  },
  created() {
    window.isUserAllowedToResetPassword(this.$route.query.id);
    this.SendOTPModel.PhoneNo = "+" + this.$route.query.id;
    this.Model.PhoneNo = this.SendOTPModel.PhoneNo;
    this.SendText();
  }
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
