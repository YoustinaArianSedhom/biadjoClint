<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<!--functional -->
<template>
  <footer
    class="text-white the-footer  flex-wrap"
    :class="classes"
    style="background-color: #191919;"
  >
    <vs-row>
      <vs-col class="mb-4" vs-lg="5" vs-sm="4" vs-xs="12">
        <img
          key="onlineImg"
          src="@/assets/images/logo/logo.png"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
        <span class="text-white"
          >{{ $t("COPYRIGHT") }} © {{ new Date().getFullYear() }}
          <a
            href="https://Biadjo.com/"
            class="text-white"
            target="_blank"
            rel="nofollow"
            >{{ $t("Biadjoltd") }}</a
          >, {{ $t("AllrightsReserved") }}</span
        >
      </vs-col>
      <vs-col class="text-white mb-4" vs-lg="4" vs-sm="4" vs-xs="12">
        {{ $t("GETINTOUCH") }}

        <ul>
          <li v-if="getPhoneNumberIfUserLoggedIn">
            <span
              >{{ $t("TechnicalSupport") }} :
              <a :href="`tel:${TechNumber}`" class=" mr-4 text-primary">
                {{ TechNumber }}</a
              >
            </span>
          </li>
          <li>
            <span
              >{{ $t("GENERAL") }} :
              <a href="mailto:info@biadjo.com" class=" mr-4 text-primary">
                info@biadjo.com
              </a>
            </span>
          </li>
          <li>
            <span
              >{{ $t("SALES") }} :
              <a href="mailto:sales@biadjo.com" class=" mr-4 text-primary">
                sales@biadjo.com</a
              >
            </span>
          </li>
          <li>
            <span
              >{{ $t("SUPPORT") }} :
              <a href="mailto:support@biadjo.com" class=" mr-4 text-primary">
                support@biadjo.com</a
              >
            </span>
          </li>
        </ul>
      </vs-col>
      <vs-col class="mb-4" vs-lg="2" vs-sm="4" vs-xs="12">
        {{ $t("OTHERLINKS") }}

        <ul>
          <!-- <li>
            <span>
              <a
                href="https://biadjo.com/user-guide/"
                target="_blank"
                rel="nofollow"
                >{{ $t("UserGuid") }}</a
              ></span
            >
          </li>
          <li>
            <span>
              <a
                href="https://biadjo.com/faqs/"
                target="_blank"
                rel="nofollow"
                >{{ $t("FAQs") }}</a
              ></span
            >
          </li> -->
          <li>
            <span>
              <a
                href="https://biadjo.com/privacy-policy/"
                target="_blank"
                rel="nofollow"
                >{{ $t("Privacypolicy") }}</a
              ></span
            >
          </li>
          <li>
            <span>
              <a
                href="https://biadjo.com/terms-and-conditions/"
                target="_blank"
                rel="nofollow"
                >{{ $t("TermsandConditions") }}</a
              ></span
            >
          </li>
          <!-- <li>
            <span>
              <a
                href="https://biadjo.com/about-us/"
                target="_blank"
                rel="nofollow"
                >{{ $t("AboutBiadjo") }}</a
              ></span
            >
          </li> -->
        </ul>
      </vs-col>
    </vs-row>
  </footer>
</template>

<script>
import moduleGeneral from "@/store/General/moduleGeneral.js";

export default {
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  },
  data() {
    return { TechNumber: "" };
  },
  computed: {
    getPhoneNumberIfUserLoggedIn() {
      return this.$store.state.AppActiveUser.AccessToken;
    }
  },
  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }

    if (this.getPhoneNumberIfUserLoggedIn) {
      var Obj = {};
      Obj.CountryCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode;
      this.$store
        .dispatch("General/SuppoertPhoneNumber", Obj)
        .then(response => {
          if (response.status == 200) {
            this.TechNumber = response.data.PhoneNo;
          }
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.text-white {
  color: #fff !important;
}
</style>
