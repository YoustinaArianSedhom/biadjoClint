<template>
  <vx-card class="p-8">
    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <label class="text-sm opacity-75">{{ $t("MessageType") }}</label>
          <v-select
            style="padding-bottom: 0 !important;padding-top: 0 !important"
            class="mt-1 w-full"
            name="MessageType"
            v-model="Model.MessageType"
            tabindex="0"
            :reduce="Value => Value.Value"
            :options="this.$options.ContactUsMessageTypesJson"
            v-validate="'required'"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          />
          <span class="text-danger text-sm" v-show="errors.has('MessageType')">
            {{ errors.first("MessageType") }}</span
          >
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <vs-textarea tabindex="1" rows="12" v-model="Model.MessageBody" />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button
            class="mr-3 mb-2"
            @click="SendMessage"
            :disabled="!validateForm"
            >{{ $t("Send") }}</vs-button
          >
          <vs-button
            color="warning"
            type="border"
            class="mb-2"
            @click="Reset"
            >{{ $t("Reset") }}</vs-button
          >
          <!-- input9 = input10 = input11 = textarea = input12 = '';
            check3 = false; -->
        </div>
      </div>
    </form>
  </vx-card>
</template>
<script>
import moduleGeneral from "@/store/General/moduleGeneral.js";
import ContactUsMessageTypes_JSON from "@/views/JsonFiles/ContactUsMessageTypes.json";

export default {
  ContactUsMessageTypesJson: ContactUsMessageTypes_JSON,
  data() {
    return {
      Model: {
        MessageType: null,
        MessageBody: "",
        UserEmail: "",
        UserPhoneNo: "",
        UserFullName: "",
        UserType: "Client",
        UserId: ""
      }
    };
  },
  computed: {
    validateForm() {
      return (
        //!this.errors.any() &&
        this.Model.MessageBody.length > 0 &&
        this.Model.MessageType !== "" &&
        this.Model.MessageType !== null
      );
    }
  },
  methods: {
    Reset() {
      this.Model.MessageBody = "";
      this.Model.MessageType = null;
    },
    SendMessage() {
      this.$vs.loading();
      this.$store
        .dispatch("General/ContactUs", this.Model)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccessContactUs();
            this.$router.push({ name: "home" });
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },
  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }

    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.Model.UserId = userInfo.Id;
    this.Model.UserEmail = userInfo.Email;
    this.Model.UserPhoneNo = userInfo.PhoneNumber;
    this.Model.UserFullName = userInfo.firstName + " " + userInfo.lastName;
  }
};
</script>
