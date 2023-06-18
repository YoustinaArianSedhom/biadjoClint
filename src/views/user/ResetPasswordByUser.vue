<template>
  <form>
    <div class="flex w-full bg-img">
      <div
        class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center"
      >
        <vx-card>
          <div slot="no-body" class="full-page-bg-color">
            <div class="vx-row">
              <div
                class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
              >
                <img
                  src="@/assets/images/pages/reset-password.png"
                  alt="login"
                  class="mx-auto"
                />
              </div>
              <div
                class="Min-Height vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"
              >
                <div class="p-8">
                  <div class="vx-card__title mb-8">
                    <h4 class="mb-4">{{ $t("ResetPassword") }}</h4>
                    <!-- <p>Please enter your new password.</p> -->
                  </div>
                  <!-- <vs-input
                  type="text"
                  label-placeholder="User ID"
                  v-model="Model.Id"
                  class="w-full mb-6"
                  @change="CheckId()"
                /> -->
                  <vs-input
                    tabindex="0"
                    name="password"
                    type="password"
                    v-model="Model.NewPass"
                    label-placeholder="New Password"
                    class="w-full mb-6"
                    v-validate.continues="'min:8|max:100'"
                    ref="password"
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

                  <vs-input
                    tabindex="1"
                    type="password"
                    v-validate="'min:8|max:100|confirmed:password'"
                    name="confirm_password"
                    label-placeholder="Confirm Password"
                    v-model="confirm_password"
                    class="w-full mb-6"
                    data-vv-as="password"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('confirm_password')"
                    >{{ errors.first("confirm_password") }}</span
                  >

                  <div
                    class="flex flex-wrap justify-between flex-col-reverse sm:flex-row"
                  >
                    <vs-button
                      type="border"
                      @click="Back()"
                      class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto"
                    >
                      {{ $t("Back") }}</vs-button
                    >
                    <vs-button
                      @click.prevent="confirmResetPasssword"
                      :disabled="!validateForm"
                      class="w-full sm:w-auto"
                    >
                      {{ $t("ResetPassword") }}</vs-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      Model: {
        NewPass: "",
        PhoneNo: ""
      },
      confirm_password: ""
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.NewPass == this.confirm_password &&
        this.Model.NewPass != ""
      );
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    confirmResetPasssword() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToResetPasssword"),
        accept: this.ResetPassword,
        acceptText: this.$t("Reset"),
        cancelText: this.$t("Cancel"),
        cancel: this.CancelAlert
      });
    },
    ResetPassword() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }

      this.$vs.loading();
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.Model.PhoneNo = userInfo.PhoneNumber;
      this.$store
        .dispatch("auth/ForgotPassword", this.Model)
        .then(res => {
          if (res.status == 200) {
            if (res.data == "1") {
              this.$vs.loading.close();
              window.showPasswordChanged();
              //this.$router.push("/user/login/login");
            } else {
              this.$vs.loading.close();
            }
          }
          this.$vs.loading.close();
        })
        .catch(Error => {
          if (Error.status == 400) {
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
    }
  }
};
</script>
<style scoped>
.Min-Height {
  min-height: 250px;
}
</style>
