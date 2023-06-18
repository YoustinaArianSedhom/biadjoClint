<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <br />
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/Biadjo Vectors_Fleet Signup.png"
                alt="register"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg "
            >
              <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-card__title">
                  <vs-button
                    type="border"
                    to="/user/login/login"
                    class="px-4 md:w-auto float-right mt-2"
                    >{{ $t("BackToLogin") }}</vs-button
                  >
                  <h4 class="mb-2">{{ $t("CreateAccount") }}</h4>
                  <p>{{ $t("CreateAccountTitle") }}</p>
                </div>
                <!-- <div class="vx-card__title mb-4">
                  <h4 class="mb-4">{{ $t("CreateAccount") }}</h4>
                  <p>{{ $t("CreateAccountTitle") }}</p>
                </div> -->

                <div class="w-full" v-if="!vertified">
                  <div class="flex mb-4 mt-8">
                    <div class="w-2/3 mr-2">
                      <label class="text-sm opacity-75">{{
                        $t("ConfirmationCode")
                      }}</label>
                      <vs-input
                        class="mb-5 w-full"
                        v-model="text"
                        name="Text"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Text')"
                        >{{ errors.first("Text") }}</span
                      >
                    </div>
                    <div class="w-1/3 mt-6">
                      <vs-button
                        style="padding-left: 5px;padding-right: 5px;"
                        class="mb-5 w-full"
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

                  <div class="flex flex-wrap justify-center m-2 ">
                    <vs-button
                      class=""
                      :disabled="text == ''"
                      @click.prevent="VertifyCode()"
                    >
                      {{ $t("Continue") }}</vs-button
                    >
                  </div>
                </div>

                <div v-if="!userTypeStep">
                  <div class="vx-row ml-0 mt-8">
                    {{ $t("ChooseUserType") }}
                  </div>
                  <div class="vx-row ">
                    <div class="vx-col w-full">
                      <vs-radio
                        class="mt-3"
                        v-model="statusFilter"
                        vs-value="Company"
                        >{{ $t("Company") }}</vs-radio
                      >
                      <vs-radio
                        class="ml-4"
                        v-model="statusFilter"
                        vs-value="User"
                        >{{ $t("User") }}</vs-radio
                      >
                    </div>
                  </div>

                  <div class="flex flex-wrap justify-center m-2  mt-12">
                    <vs-button
                      :disabled="statusFilter == ''"
                      @click.prevent="ChoseType()"
                    >
                      {{ $t("Continue") }}</vs-button
                    >
                  </div>
                </div>

                <div v-if="vertified && setUserType && statusFilter == 'User'">
                  <RegisterJWT></RegisterJWT>
                </div>

                <div
                  v-if="vertified && setUserType && statusFilter == 'Company'"
                >
                  <RegisterCompany></RegisterCompany>
                </div>

                <br />
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import RegisterJWT from "./RegisterJWT.vue";
import RegisterCompany from "./RegisterCompany.vue";

export default {
  components: {
    RegisterJWT,
    RegisterCompany
    // RegisterFirebase,
    // RegisterAuth0
  },
  data() {
    return {
      userTypeStep: true,
      setUserType: false,
      text: "",
      IsClicked: false,
      disable: true,

      minutes: 5,
      seconds: 0,
      statusFilter: "",
      vertified: false,
      SendOTPModel: { PhoneNo: "", activationCode: "" }
    };
  },
  methods: {
    ChoseType() {
      this.setUserType = true;
      this.userTypeStep = true;
    },
    setTimer() {
      this.minutes = 5;
      this.seconds = 0;
    },
    SendText() {
      //
      this.$vs.loading();
      this.SendOTPModel.activationCode = this.randomNumber = Math.floor(
        Math.random() * (9999 - 1001) + 1000
      );
      this.SendOTPModel.PhoneNo = this.SendOTPModel.PhoneNo.replace(/\s/g, "");

      this.$validator.validateAll().then(result => {
        if (result) {
          // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          // this.Model.CompanyId = userInfo.CompaneyId;
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
      //
      //this.$vs.loading();
      if (this.SendOTPModel.activationCode == this.text) {
        this.vertified = true;
        this.userTypeStep = false;
        //this.$vs.loadin.close();
      } else {
        //this.$vs.loading.close();
        window.IncorrectCode();
        //this.vertified = true;
      }
    }
  },
  created() {
    window.isUserAllowedToRegist(
      this.$route.params.PhoneNo,
      this.$route.params.CountryCode,
      this.$route.params.Country
    );
    this.SendOTPModel.PhoneNo = this.$route.params.PhoneNo;
  }
};
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 300px;

  .con-tab {
    padding-bottom: 14px;
  }
}
</style>
