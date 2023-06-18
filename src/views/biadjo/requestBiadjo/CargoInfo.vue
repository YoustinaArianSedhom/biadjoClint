<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
  <div>
    <form>
      <!-- cargo type -->
      <div class="mb-4">
        <label class="text-sm opacity-75">{{ $t("CargoType") }}</label>
        <vs-input
          tabindex="0"
          type="text"
          v-validate="'required'"
          class="mt-1 w-full"
          v-model="CargoData.CargoType"
          name="CargoType"
        />
        <span class="text-danger text-sm" v-show="errors.has('CargoType')">{{
          errors.first("CargoType")
        }}</span>
      </div>

      <div class="mb-4">
        <label class="text-sm opacity-75">{{ $t("CargoDescription") }}</label>
        <vs-textarea rows="5" v-model="CargoData.CargoDescription" />

        <span
          class="text-danger text-sm"
          v-show="errors.has('CargoDescription')"
          >{{ errors.first("CargoDescription") }}</span
        >
      </div>

      <div class="mb-4">
        <!-- <div class="vx-col w-full sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5"> -->
        <label class="text-sm opacity-75"> {{ $t("EstimatedValue") }}</label>
        <vs-input
          tabindex="1"
          @keypress="isNumber($event)"
          type="Number"
          v-validate="'required'"
          :min="0"
          class="mt-1 w-full"
          v-model="CargoData.CargoValue"
          name="CargoValue"
          icon-after
          :icon="$t(`${userInfo.countrycode}_Currency`)"
          @focusout="GetInsuranceValue(CargoData.CargoValue)"
        />

        <span class="text-danger text-sm" v-show="errors.has('CargoValue')">{{
          errors.first("CargoValue")
        }}</span>
        <!-- </div> -->
      </div>

      <div class="vx-row mb-4">
        <div class="vx-col w-full sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5">
          <label class="text-sm opacity-75">{{ $t("CargoWeight") }}</label>
          <vs-input
            tabindex="2"
            @keypress="isNumber($event)"
            v-validate="'required'"
            type="Number"
            :min="0"
            class="w-full"
            v-model="CargoData.CargoWeight"
            name="CargoWeight"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('CargoWeight')"
            >{{ errors.first("CargoWeight") }}</span
          >
        </div>
        <div class="vx-col w-full sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5">
          <v-select
            v-model="CargoData.CargoWeightUnit"
            :reduce="Code => Code.Code"
            class="mt-6 w-full"
            style="padding:0px !important"
            :options="this.$options.weightUnitJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full ">
          <vs-checkbox
            v-model="Workers"
            icon-pack="feather"
            tabindex="3"
            style="padding-top: 15px;"
            class="mt-5 w-full"
            @change="WorkersNumber"
          >
            {{ $t("CargoWorkersConfirmation") }}</vs-checkbox
          >
          <!-- <span class="text-danger text-sm" v-if="!CargoData.Workers">{{
            $t("WorkersWarning")
          }}</span> -->
        </div>
        <div v-show="Workers" class="vx-col w-full">
          <!-- <label class="text-sm opacity-75">{{ $t("NumberOfWorkers") }}</label> -->
          <vs-input-number
            class="bg-white"
            v-model="CargoData.NumberOfWorkers"
            min="1"
            :label="$t('NumberOfWorkers')"
            :max="25"
            :step="1"
            name="NumberOfWorkers"
          />

          <span
            class="text-danger text-sm"
            v-show="errors.has('NumberOfWorkers')"
            >{{ errors.first("NumberOfWorkers") }}</span
          >
        </div>
      </div>

      <div class="mb-4">
        <vs-checkbox
          v-model="CargoData.Insurance"
          icon-pack="feather"
          tabindex="5"
          style="padding-top: 15px;"
          class="mt-5 w-full"
        >
          {{ $t("CargoInsuranceConfirmation") }}</vs-checkbox
        >
        <span class="text-danger text-sm" v-if="!CargoData.Insurance">{{
          $t("InsuranceWarning")
        }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import vSelect from "vue-select";
import weightUnit_JSON from "./../../biadjo/json/weightUnit.json";
export default {
  weightUnitJson: weightUnit_JSON,
  components: {
    vSelect
  },
  props: {
    CargoData: {
      type: Object,
      default: () => ({
        Insurance: true,
        CargoWeightUnit: "",
        CargoWeight: "",
        CargoDescription: "",
        CargoType: "",
        CargoValue: "",
        validateForm: false,
        InsuranceValue: 0,
        NumberOfWorkers: ""
      })
    }
  },
  data() {
    return {
      Workers: false,
      userInfo: {},
      InsuranceValue: 0,
      NumberOfWorkers: 0
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.CargoData.Insurance !== "" &&
        this.CargoData.CargoWeight !== "" &&
        this.CargoData.CargoWeightUnit !== "" &&
        this.CargoData.CargoValue !== "" &&
        this.CargoData.CargoDescription !== "" &&
        this.CargoData.CargoType !== ""
      );
    }
  },
  methods: {
    WorkersNumber() {
      if (!this.Workers) {
        this.CargoData.NumberOfWorkers = 0;
      }
    },
    isNumber: function(evt) {
      evt = evt || window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    GetInsuranceValue(value) {
      if (!this.CargoData.Insurance) {
        this.CargoData.InsuranceValue = 0;
        return;
      }
      if (value || value != 0 || value != "") {
        let Insurance = {};
        Insurance.CargoValue = value;
        Insurance.BiadjoId = 0;
        Insurance.CountryCode = JSON.parse(
          localStorage.getItem("userInfo")
        ).countrycode;
        this.$store
          .dispatch("BiadjoList/GetInsuranceValue", Insurance)
          .then(response => {
            if (response.status == 200) {
              this.CargoData.InsuranceValue = response.data;
            } else {
              window.showError();
            }
          })
          .catch(() => {
            window.showError();
          });
      } else {
        this.CargoData.InsuranceValue = 0;
      }
    }
  },
  mounted() {
    this.CargoData.NumberOfWorkers = 0;
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
};
</script>
<style lang="scss">
#avatar-col {
  width: 10rem;
}
#page-Biadjo-view {
  vertical-align: baseline !important;
  min-width: 140px;
  padding-bottom: 0.8rem;
  word-break: break-all;

  &:not(.permissions-table) {
    td {
      vertical-align: baseline !important;
      @media screen and (max-width: 370px) {
        display: block;
      }
    }
  }
}
@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
.login-tabs-container {
  min-height: 495px;
  .con-tab {
    padding-bottom: 14px;
  }
  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
