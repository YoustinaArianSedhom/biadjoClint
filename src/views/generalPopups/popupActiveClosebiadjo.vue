<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <vs-row vs-type="flex" vs-justify="center">
      <vs-col
        class="m-4"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="12"
      >
        <star-rating
          v-bind:increment="0.5"
          v-bind:max-rating="5"
          :dir="$vs.rtl ? 'ltr' : 'ltr'"
          inactive-color="gray"
          active-color="orange"
          v-bind:read-only="false"
          v-bind:show-rating="false"
          v-bind:round-start-rating="false"
          v-bind:star-size="50"
          v-model="CloseBiadjo.Rating"
        ></star-rating>
      </vs-col>
    </vs-row>

    <vs-row vs-type="flex" vs-justify="center">
      <vs-button @click="closeBiadjo" class="mr-2 mb-2">{{
        $t("Submit")
      }}</vs-button>
      <vs-button @click="ClosePopup" class="mr-2 mb-2">{{
        $t("Cancel")
      }}</vs-button>
    </vs-row>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";

export default {
  components: {
    StarRating
  },
  props: {
    CloseBiadjo: {
      type: Object
    }
  },
  // data() {
  //   return {
  //     Rating: ""
  //   };
  // },
  computed: {
    validateCloseBiadjo() {
      return !this.errors.any() && this.CloseBiadjo.Rating !== "";
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    },

    closeBiadjo() {
      if (!this.validateCloseBiadjo) {
        return;
      }

      this.$vs.loading();

      // this.popupActiveClosebiadjo = false;

      this.CloseBiadjo.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;

      this.$store
        .dispatch("BiadjoList/CloseBiadjoByClient", this.CloseBiadjo)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            this.$emit("ClosePopup");
            window.showSuccess();
            location.reload("/");
          } else {
            this.$vs.loading.close();
            window.showError();
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
  }
};
</script>
