<template>
  <div class="w-full vx-row no-gutter items-center justify-center ">
    <!-- select card or wallet -->
    <div>
      <vs-row vs-type="flex" vs-justify="center">
        <vs-col class="m-4" vs-type="flex" vs-w="5">
          <vs-input
            type="number"
            min="1"
            class="w-full"
            @input="NotValidAmount"
            v-model="Amount"
          />
          <span v-if="showAmountNote" class="text-warning mb-4 mt-4">{{
            $t("NotValidAmount")
          }}</span>
        </vs-col>
        <vs-col class="m-4" vs-type="flex" vs-w="5">
          <vs-button
            class="w-full"
            :disabled="Amount == '' || showAmountNote"
            @click="TransferBalanceToUser"
          >
            {{ $t("TransferBalance") }}</vs-button
          >
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    FormData: {
      type: Object
    }
  },
  data() {
    return {
      Amount: "",
      showAmountNote: false
    };
  },
  computed: {
    validateResponse() {
      return !this.errors.any() && this.Amount !== "";
    }
  },
  methods: {
    NotValidAmount() {
      if (this.Amount.includes(".")) {
        if (this.Amount.split(".")[1].length > 2) {
          this.showAmountNote = true;
        } else {
          this.showAmountNote = false;
        }
      }
    },
    ClosePopup() {
      this.$emit("ClosePopup");
    },

    TransferBalanceToUser() {
      if (!this.NotValidAmount) {
        window.showError();
        return;
      }

      var Model = {};
      Model.UserID = JSON.parse(localStorage.getItem("userInfo")).Id;
      Model.RecieverUserID = this.FormData.Id;
      Model.Amount = this.Amount;
      this.$vs.loading();
      this.$store
        .dispatch("Company/TransferBalanceToUser", Model)
        .then(response => {
          if (response.status === 200) {
            this.$vs.loading.close();
            window.showBalanceTransfered();
            this.Amount = "";
            this.$emit("ClosePopup");
          }
        })
        .catch(error => {
          if (error.status == 400) {
            this.$vs.notify({
              color: "#EA5455",
              position: "top-center",
              title: this.$t("Error"),
              text: this.$t(error.data)
            });
            this.$vs.loading.close();
            this.Amount = "";
            this.$emit("ClosePopup");
          } else {
            this.$vs.loading.close();
            window.showError();
            this.$emit("ClosePopup");
            this.Amount = "";
          }
        });
      this.$vs.loading.close();
    }
  }
};
</script>
