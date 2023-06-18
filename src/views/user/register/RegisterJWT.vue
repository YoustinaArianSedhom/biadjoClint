<template>
  <div class=" clearfix regist-tabs-container">
    <!-- <div class="vx-row no-gutter justify-center items-center"> -->
    <!-- <div class="mr-2 ml-2 mt-2"> -->
    <!-- <span class="text-primary text-lg">{{ $t("CheckUserTitle") }}</span> -->
    <!-- </div> -->
    <!-- </div> -->
    <form>
      <div class="  w-full ">
        <div class="vx-row mt-8">
          <div class="vx-col md:w-1/2 w-full">
            <div class="vx-row mt-4">
              <label class="text-sm opacity-75">{{ $t("Firstname") }}</label>
              <vs-input
                tabindex="0"
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
          <div class="vx-col md:w-1/2 w-full">
            <div class="vx-row mt-4">
              <label class="text-sm opacity-75">{{ $t("Lastname") }}</label>
              <vs-input
                tabindex="1"
                v-validate="'required|alpha_dash|min:3'"
                name="LastName"
                v-model="Model.LastName"
                class=" w-full"
              />
              <span class="text-danger text-sm">{{
                errors.first("LastName")
              }}</span>
            </div>
          </div>
        </div>

        <div class="vx-row mt-8">
          <label class="text-sm opacity-75">{{ $t("Email") }}</label>
          <vs-input
            tabindex="2"
            v-validate="'required|email'"
            name="Email"
            type="email"
            v-model="Model.Email"
            class=" w-full"
          />
          <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
        </div>

        <div class="vx-row mt-8">
          <label class="text-sm opacity-75">{{ $t("Password") }}</label>
          <vs-input
            tabindex="3"
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

        <div class="vx-row mt-8">
          <label class="text-sm opacity-75">{{ $t("ConfirmPassword") }}</label>
          <vs-input
            tabindex="4"
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

        <!-- <div class="flex flex-wrap justify-between m-2 "> -->
        <div class="flex float-right mt-8 ">
          <vs-button :disabled="!validateForm" @click="RegistUser" class="">
            {{ $t("Register") }}</vs-button
          >

          <!-- <vs-button type="border" to="/user/login/login">{{
            $t("BackToLogin")
          }}</vs-button> -->
        </div>
      </div>
    </form>
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

      innerSetInterval: null,
      ApiDataText: "",
      find: true,
      right: false,
      isValid: true,
      Model: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PhoneNo: "",
        AccountType: "AT0",
        CountryCode: "",
        Country: "",
        CompanyUser: "false"
        //CompanyId:"0"
      },
      Company: {
        PhoneNo: "",
        CompaneyId: ""
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
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.FirstName !== "" &&
        this.Model.LastName !== "" &&
        this.Model.Email !== "" &&
        this.Model.PhoneNo !== "" &&
        this.Model.Password == this.confirm_password &&
        this.Model.Password != "" &&
        this.Model.CountryCode != ""
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
    RegistUser() {
      //

      if (!this.validateForm || !this.checkLogin()) {
        return;
      }

      this.$vs.loading();
      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      this.$store
        .dispatch("auth/RegisterUser", this.Model)
        .then(res => {
          if (res.status == 200) {
            if (res.data == "0") {
              this.$vs.loading.close();
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("UserExists"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger"
              });
            } else {
              this.$vs.loading.close();
              this.$router.push("/user/login/login");
            }
          }
          this.$vs.loading.close();
        })
        .catch(Error => {
          if (Error.response.status == 400) {
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
    }
  },
  created() {
    //
    window.isUserAllowedToRegist(
      this.$route.params.PhoneNo,
      this.$route.params.CountryCode,
      this.$route.params.Country
    );

    this.Model.PhoneNo = this.$route.params.PhoneNo;
    this.Model.CountryCode = this.$route.params.CountryCode;
    this.Model.Country = this.$route.params.Country;
  }
};
</script>

<style scoped>
.regist-tabs-container {
  min-height: 400px;
}
</style>
