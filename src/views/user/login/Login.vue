<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <div v-if="getMobileOperatingSystem && IsMobileView">
      <DownloadOurAPP @CheckIsMobileView="CheckIsMobileView"></DownloadOurAPP>
      <!-- <div class="mr-2 ml-2 mt-8">
        <span class="text-primary text-lg">{{ $t("EnterRequiredData") }}</span>
      </div> -->
    </div>
    <div
      v-if="!getMobileOperatingSystem || !IsMobileView"
      class="h-auto flex w-full bg-img vx-row no-gutter items-center justify-center"
      id="page-login"
    >
      <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
        <vx-card>
          <div slot="no-body" class="full-page-bg-color">
            <div class="vx-row no-gutter justify-center items-center">
              <div class="vx-col hidden lg:block lg:w-1/2">
                <img
                  src="@/assets/images/pages/Biadjo Vectors_Login.png"
                  alt="login"
                  class="mx-auto"
                />
              </div>

              <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                <div class="px-8 pt-8 login-tabs-container">
                  <div class="vx-card__title mb-4">
                    <h4 class="mb-4">{{ $t("Welcome") }}</h4>
                    <!-- <p>{{ $t("CheckUserTitle") }}</p> -->
                  </div>
                  <LoginJWT></LoginJWT>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import LoginJWT from "./LoginJWT.vue";
import DownloadOurAPP from "@/views/MobileView/DownloadOurAPP.vue";

export default {
  components: {
    LoginJWT,
    DownloadOurAPP
  },
  data() {
    return {
      IsMobileView: true
    };
  },
  methods: {
    CheckIsMobileView(val) {
      this.IsMobileView = val;
    }
  },
  computed: {
    getMobileOperatingSystem() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
      if (/android/i.test(userAgent)) {
        return true;
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
      }
      return false;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 400px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
