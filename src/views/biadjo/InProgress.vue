<template>
  <div>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="Biadjo != undefined || Biadjo != null"
        >
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="Biadjo"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4 mb-2"
                @click="Back"
                type="border"
                color="warning"
                icon-pack="feather"
              >
                {{ $t("Back") }}
              </vs-button>
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <!-- <vs-th>Image</vs-th> -->
              <vs-th sort-key="Biadjo Number">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Price">{{ $t("Price") }}</vs-th>
              <vs-th sort-key="Schedual">{{ $t("Schedual") }}</vs-th>
              <vs-th sort-key="Closing Date">{{ $t("ClosingDate") }}</vs-th>
              <vs-th sort-key="Payment Status">{{ $t("PaymentStatus") }}</vs-th>
              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <!-- <vs-th sort-key="Driver Payment Status">
                {{ $t("DriverPaymentStatus") }}
              </vs-th> -->
              <!-- <vs-th sort-key="Rating">{{ $t("Rating") }}</vs-th> -->
              <vs-th>{{ $t("BiadjoDetails") }}</vs-th>
              <vs-th>{{ $t("CloseBiadjo") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="Price">
                      {{ tr.Total | numFormat("###,##0.00") }}
                      {{ $t(tr.CountryCode + "_Currency") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Schedual">
                      {{ tr.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="ClosingDate">
                      {{ tr.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getStatusColor(tr.PaymentStatus)"
                      class="PaymentStatus"
                    >
                      <p>{{ $t(tr.PaymentStatus) }}</p>
                    </vs-chip>
                  </vs-td>

                  <vs-td>
                    <vs-chip :color="getStatusColor(tr.Status)" class="Status">
                      <p>{{ $t(tr.Status) }}</p>
                    </vs-chip>

                    <!-- <p class="Status">{{ $t(tr.Status) }}</p> -->
                  </vs-td>
                  <!-- <vs-td>
                    <vs-chip
                      :color="getStatusColor(tr.DriverPaymentStatus)"
                      class="DriverPaymentStatus"
                    >
                      <p>{{ $t(tr.DriverPaymentStatus) }}</p>
                    </vs-chip>

                  </vs-td> -->
                  <!-- <vs-td>
                    <p class="Rating">{{ tr.Rating }}</p>
                  </vs-td> -->

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'BiadjoDetails',
                        params: { Id: tr.id }
                      }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                  </vs-td>

                  <vs-td>
                    <vs-button
                      :disabled="tr.Status != 'BS11'"
                      @click="confirmClose(tr)"
                      color="danger"
                      icon-pack="feather"
                      size="large"
                      icon="icon-power"
                    ></vs-button>
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>

        <div class="success payment">
          <vs-popup
            classContent="popup-example"
            v-bind:title="$t('SetRate')"
            :active.sync="popupActiveClosebiadjo"
            :button-close-hidden="true"
          >
            <popupActiveClosebiadjo
              :CloseBiadjo="CloseBiadjo"
              @ClosePopup="popupActiveClosebiadjo = false"
            ></popupActiveClosebiadjo>
          </vs-popup>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
// import StarRating from "vue-star-rating";

export default {
  components: {
    // StarRating
    popupActiveClosebiadjo: () =>
      import("@/views/generalPopups/popupActiveClosebiadjo.vue")
  },

  data() {
    return {
      CloseBiadjo: { BiadjoID: "", Rating: 5 },
      selectedBiadjo: {},
      popupActiveClosebiadjo: false,
      selected: [],
      itemsPerPage: 10,

      BiadjoModel: {
        LessThan: "true",
        CountryCode: "",
        Status: "",
        DriverPaymentStatus: "",
        Rating: null,
        Schedual: "",
        Price: "",
        id: "",
        ClosingDate: ""
      },
      Biadjo: []
    };
  },
  computed: {
    Country() {
      return this.$store.state.CountryList.Country;
    }
  },

  methods: {
    getStatusColor(status) {
      if (status == "PS3") {
        return "#F8BD30";
      }
      if (status == "PS1") {
        return "#039BE5";
      }
      if (status == "PS2") {
        return "#B11226";
      }

      if (status == "BS1") {
        return "#F8BD30";
      }
      if (status == "BS2") {
        return "#F8BD30";
      }
      if (status == "BS3") {
        return "#F8BD30";
      }
      if (status == "BS4") {
        return "dark";
      }

      if (status == "BS11") {
        return "#039BE5";
      }
      if (status == "BS12") {
        return "#B11226";
      }
      if (status == "BS13") {
        return "#B11226";
      }
      if (status == "BS14") {
        return "#B11226";
      }

      if (status == "DPS1") {
        return "#039BE5";
      }
      if (status == "DPS2") {
        return "#B11226";
      }
      if (status == "DPS3") {
        return "#F8BD30";
      }

      return "primary";
    },
    Back() {
      this.$router.go(-1);
    },
    Search() {
      this.$vs.loading();
      this.$validator.validateAll().then(result => {
        if (result) {
          this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
          var JsonValue = {};
          JsonValue.UserID = this.userInfo.Id;

          this.$store
            .dispatch("BiadjoList/InProgressTripsUsers", JsonValue)
            .then(res => {
              if (res.status == 200) {
                if (res.data.length > 0) {
                  this.Biadjo = res.data;
                  this.$vs.loading.close();
                } else {
                  this.$vs.loading.close();
                  window.showNoRecords();
                }
              }
            })
            .catch(() => {
              this.$vs.loading.close();
              window.showError();
            });
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
    },
    confirmClose(tr) {
      this.selectedBiadjo = tr;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmClose"),
        text: this.$t("BiadjoCloseConfirmation"),
        cancelText: this.$t("Cancel"),
        accept: this.ShowRate,
        acceptText: this.$t("Close")
      });
    },
    ShowRate() {
      this.CloseBiadjo.BiadjoID = this.selectedBiadjo.id;
      // this.CloseBiadjo.BiadjoID = this.$route.params.Id;
      this.popupActiveClosebiadjo = true;
    }
  },

  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }

    this.Search();
  }
};
</script>

<style lang="scss">
#parentx {
  overflow: hidden;
  height: 500px;
  position: relative;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}

#data-list-list-view {
  .vs-con-table {
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
.theme-dark {
  #instant-search-demo {
    #content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}
.autocomplete {
  position: relative;
  width: 100%;
}
.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #content-container {
    .vs-sidebar {
      position: fixed !important;
      float: left !important;
    }
  }
}

.grid-view-item {
  // height: 450px;

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }

  button.page-link {
    display: inline-block;
  }

  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }

  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
}</style
><style>
.vs-sidebar.vs-sidebar-parent {
  max-height: 1500px !important;
}
</style>
