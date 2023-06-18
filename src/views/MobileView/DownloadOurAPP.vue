<template>
  <div v-if="IsMobileView" class="grid-layout-container alignment-block">
    <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col
        class="pb-6 pl-4 pr-4"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="8"
      >
        <p class="text-center text-dark text-xl">
          Download Our APP
        </p>
      </vs-col>
      <vs-col
        class="pb-6 pl-4 pr-4"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="8"
      >
        <a
          href="https://play.google.com/store/apps/details?id=com.biadjo.clients"
        >
          <img
            src="@/assets/images/GoogleStore.png"
            alt="Download From Play Store"
          />
        </a>
      </vs-col>
      <vs-col
        class="pb-6 pl-4 pr-4"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="8"
      >
        <a href="https://apps.apple.com/app/apple-store/id1514695043">
          <img
            src="@/assets/images/AppleStore.png"
            alt="Download From App Store"
          />
        </a>
      </vs-col>
    </vs-row>
    <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col
        class="pb-6 pl-4 pr-4"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="8"
      >
        <vs-button type="flat" @click="CheckIsMobileView">
          {{ $t("Continue") }}
        </vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      IsMobileView: true
    };
  },
  methods: {
    CheckIsMobileView() {
      this.IsMobileView = false;
      this.$emit("CheckIsMobileView", this.IsMobileView);
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  }
};
</script>
