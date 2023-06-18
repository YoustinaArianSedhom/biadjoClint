<template>
  <div class="vx-row">
    <div class="vx-col w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 ">
      <div class="vx-row">
        <div class="vx-col ">
          <!-- Col 1 Start -->
          <table>
            <tr>
              <td>
                <feather-icon
                  icon="CalendarIcon"
                  class="IconsColor ml-1 mr-1"
                  svgClasses="w-8 h-8"
                />
                <span class="align-top">
                  {{ $t("TripSchedual") }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-6 pr-10 pl-10">
                {{ ReviewData.Schedual }}
              </td>
            </tr>
            <tr>
              <td>
                <feather-icon
                  icon="TruckIcon"
                  class="IconsColor ml-1 mr-1"
                  svgClasses="w-8 h-8"
                />
                <span class="align-top"> {{ $t("VehicleType") }} </span>
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-6 pr-10 pl-10">
                {{ $t(ReviewData.VehicleType) }}
              </td>
            </tr>
          </table>

          <!-- Col 1 End -->
        </div>
        <!-- Col 2 Start -->
        <div class="vx-col">
          <table>
            <tr>
              <td>
                <feather-icon
                  icon="ClockIcon"
                  class="IconsColor ml-1 mr-1"
                  svgClasses="w-8 h-8"
                />
                <span class="align-top">
                  {{ $t("TripDuration") }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-2 pr-10 pl-8">
                {{ ReviewData.TotalDuration }}
              </td>
            </tr>
            <tr>
              <td>
                <feather-icon
                  icon="MapPinIcon"
                  class="IconsColor ml-1 mr-1"
                  svgClasses="w-8 h-8"
                />
                <span class="align-top"> {{ $t("TripDistance") }} </span>
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-6 pr-10 pl-10">
                {{ ReviewData.TotalDistance }}
              </td>
            </tr>
          </table>
        </div>
        <!-- Col 2 End  -->
        <div
          v-if="ReviewData.NumberOfWorkers > 0"
          class="vx-row  ml-auto mr-auto"
        >
          <table>
            <tr>
              <td class=" mr-2 ml-4 mr-4 text-dark text-xl">
                {{ $t("NumberOfWorkers") }}:
              </td>
              <td class="font-semibold text-xl mr-2 ml-2 pr-4 pl-4">
                {{ ReviewData.NumberOfWorkers }}
              </td>
            </tr>
          </table>
        </div>

        <vs-divider />

        <!-- Col 3 Start -->
        <div class="vx-col pb-4 w-full">
          <table>
            <tr>
              <td class="font-semibold ">
                <feather-icon
                  icon="PackageIcon"
                  class="IconsColor ml-1 mr-1"
                  svgClasses="w-8 h-8"
                />
                <span class="align-top">
                  {{ ReviewData.CargoType }}
                </span>
                <br />
                <pre
                  style="white-space:pre-line !important"
                  class="align-top pb-6 pr-10 pl-10 text-sm"
                >
                  {{ ReviewData.CargoDescription }}
                </pre>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <!-- Col 3 End  -->
        <!-- Col 4 Start -->
        <div class="vx-col  ml-8 mr-8">
          <table>
            <tr>
              <td class="pb-4">
                {{ $t("CargoValue") }}
              </td>
            </tr>

            <tr>
              <td class="font-semibold pb-6 ">
                {{ ReviewData.CargoValue | numFormat("###,##0.00") }}
                {{ $t(CountryCode + "_Currency") }}
              </td>
            </tr>
          </table>
        </div>
        <!-- Col 4 End  -->
        <!-- Col 5 Start -->
        <div class="vx-col  ml-8 mr-8">
          <table>
            <tr>
              <td class="pb-4">
                {{ $t("CargoWeight") }}
              </td>
            </tr>

            <tr>
              <td class="font-semibold pb-6 ">
                {{ ReviewData.CargoWeight | numFormat("###,##0.00") }}
                {{ $t(ReviewData.CargoWeightUnit) }}
              </td>
            </tr>
          </table>
        </div>
        <div class="vx-col  ml-8 mr-8" v-if="ReviewData.Insurance">
          <table>
            <tr>
              <td class=" pb-6 mr-2 ml-4 mr-4">
                {{ $t("InsuranceValue") }}
              </td>
              <td class="font-semibold pb-6 mr-2 ml-2 pr-4 pl-4">
                {{ ReviewData.InsuranceValue | numFormat("###,##0.00") }}
                {{ $t(CountryCode + "_Currency") }}
              </td>
            </tr>
            <!-- <tr></tr> -->
          </table>
        </div>

        <!-- Col 5 End  -->
      </div>
    </div>

    <div class="vx-col w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 ">
      <div class="vx-row">
        <div class="vx-col ">
          <table>
            <tr>
              <td>
                <feather-icon
                  icon="CircleIcon"
                  class="IconsColor ml-1 mr-1"
                  svgClasses="w-4 h-4"
                />
                <span class="align-top">{{ $t("StartAddress") }} </span>
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-6">
                {{ ReviewData.StartBiadjoLocationData.StPlaceDesicription }}
              </td>
            </tr>

            <tr>
              <td>
                <vs-divider position="right">
                  <feather-icon
                    icon="XIcon"
                    class="IconsColor"
                    svgClasses="w-4 h-4"
                  />
                  <span class="align-top">
                    {{ $t(ReviewData.NumberOfTrips) }}
                    {{ $t("Trips") }}
                  </span>
                </vs-divider>
              </td>
            </tr>
          </table>

          <div v-if="ReviewData.Stops">
            <div v-for="(item, index) in ReviewData.Stops" :key="index">
              <table>
                <tr>
                  <td>
                    <feather-icon
                      icon="CircleIcon"
                      class="IconsColor ml-1 mr-1"
                      svgClasses="w-2 h-2"
                    />
                    <span class="align-top  text-danger"
                      >{{ $t("TripNo") }} {{ index + 1 }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold pb-4 break-normal">
                    {{ item.PlaceDescription }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <table>
            <tr>
              <td>
                <feather-icon
                  icon="CircleIcon"
                  class="IconsColor ml-1 mr-1"
                  svgClasses="w-4 h-4"
                />
                <span class="align-top">{{ $t("EndAddress") }} </span>
              </td>
            </tr>
            <tr>
              <td class="font-semibold pb-6 ">
                {{ ReviewData.EndBiadjoLocationData.EnPlaceDesicription }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="vx-row  w-full text-center align-center">
      <vs-checkbox
        v-model="ReviewData1.AgreeTermsAndConditions"
        class=" text-xl"
      >
        {{ $t("Accept") }}
      </vs-checkbox>
      <span>
        <a
          href="https://biadjo.com/terms-and-conditions/"
          class="text-primary text-xl"
          target="_blank"
        >
          {{ $t("TermsAndConditions") }}
        </a>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      CountryCode: null,
      ReviewData: this.$attrs.ReviewData
    };
  },
  props: {
    ReviewData1: {
      type: Object,
      default: () => ({
        AgreeTermsAndConditions: false
      })
    }
  },

  created() {
    this.CountryCode = JSON.parse(localStorage.getItem("userInfo")).countrycode;
  }
};
</script>
<style lang="scss">
.IconsColor {
  color: #27abbe;
}
#avatar-col {
  width: 10rem;
}
#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

#page-user-list {
  .user-list-filters {
    height: 10px;

    .vs__actions {
      position: absolute;
      right: 0;
      top: 20%;
      height: 100px;
      transform: translateY(-58%);
    }
  }
}

#instant-search-demo {
  .header {
    .filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .price-slider {
    max-width: 80%;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
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
}
#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
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
