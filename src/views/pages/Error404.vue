<!-- =========================================================================================
    File Name: Error404.vue
    Description: 404 Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="h-full flex w-full bg-img">
    <div
      class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
    >
      <!-- <img src="@/assets/images/pages/404.png" alt="graphic-404" class="mx-auto mb-4 max-w-full"> -->

      <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_830fdC.json"
        background="transparent"
        speed="1"
        style="width: 400px; height: 400px;"
        loop
        autoplay
      ></lottie-player>
      <vs-button size="large" to="/">{{ $t("BackToHome") }}</vs-button>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    );
    document.head.appendChild(recaptchaScript);
  }
};
</script>
