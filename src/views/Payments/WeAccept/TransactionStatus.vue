<template>
  <div class="h-full flex w-full bg-img">
    <div
      class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
    >
      <lottie-player
        :src="PaymentStatus"
        background="transparent"
        speed="1"
        style=" height:200px;"
        autoplay
      ></lottie-player>

      <span class="text-2xl mt-4"> {{ $t(msg) }} </span>

      <span class="text-xl mt-4"> {{ $t("transactionid") }} : {{ id }} </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PaymentStatus: null,
      currency: "",
      message: "",
      id: null,
      success: "",
      txn_response_code: "",
      sub_type: "",
      msg: ""
    };
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    );
    document.head.appendChild(recaptchaScript);
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.currency = urlParams.get("currency");
    this.message = urlParams.get("message");
    this.id = urlParams.get("id");
    this.success = urlParams.get("success");
    if (this.success.toLowerCase() == "true") {
      this.PaymentStatus =
        "https://assets2.lottiefiles.com/packages/lf20_ts8SWt.json";
      this.msg = "Success";
    }
    if (this.success.toLowerCase() == "false") {
      this.PaymentStatus =
        "https://assets10.lottiefiles.com/packages/lf20_gO48yV.json";
      this.msg = "Failed";
    }
    this.txn_response_code = urlParams.get("txn_response_code");
    this.sub_type = urlParams.get("sub_type");
  }
};
</script>
