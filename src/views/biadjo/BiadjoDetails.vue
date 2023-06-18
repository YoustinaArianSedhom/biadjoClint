<template>
  <div class="p-2">
    <vx-card class="mb-base p-2">
      <div>
        <vs-button
          icon-pack="feather"
          :to="{
            name: 'FollowBiadjoOnMap',
            params: { Id: FormData.id }
          }"
          class="m-2"
          >{{ $t("FollowOnMap") }}</vs-button
        >
        <vs-button
          v-show="NoDriverFound"
          icon-pack="feather"
          @click="ResendBiadjoRequest"
          class="m-2"
          >{{ $t("ResendBiadjoRequest") }}</vs-button
        >
        <vs-button
          class="mr-4"
          @click="Back"
          type="border"
          color="warning"
          icon-pack="feather"
        >
          {{ $t("Back") }}
        </vs-button>
      </div>
      <vs-divider />

      <div class="vx-row">
        <div class="vx-col w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 ">
          <!-- First Row -->
          <div class="vx-row flex items-center justify-between pl-2">
            <table>
              <tr>
                <td>
                  <span>
                    {{ $t("BiadjoNo") }} :
                    <span class="font-semibold">
                      {{ FormData.id }}
                    </span>
                  </span>
                </td>
              </tr>
            </table>

            <table class="vx-row flex items-center justify-between pr-50">
              <tr>
                <td>
                  <vs-chip :color="getStatusColor(FormData.Status)">
                    {{ $t(FormData.Status) }}</vs-chip
                  >
                </td>
              </tr>
            </table>
          </div>
          <!-- First Row END-->
          <!-- Second Row -->
          <div class="vx-row flex items-center justify-right pl-10">
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
                  {{ FormData.Schedual | formatDate() }}
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
                  {{ $t(FormData.VehicleType) }}
                </td>
              </tr>
            </table>

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
                <td class="font-semibold pb-6 pr-10 pl-10">
                  {{ duration }}
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
                  {{ distance }}
                </td>
              </tr>
            </table>
          </div>
          <!-- Second Row End-->
          <div
            v-if="FormData.NumberOfWorkers > 0"
            class="vx-row  ml-auto mr-auto"
          >
            <table>
              <tr>
                <td class=" mr-2 ml-4 mr-4 text-dark text-xl">
                  {{ $t("NumberOfWorkers") }}:
                </td>
                <td class="font-semibold text-xl mr-2 ml-2 pr-4 pl-4">
                  {{ FormData.NumberOfWorkers }}
                </td>
              </tr>
            </table>
          </div>
          <vs-divider />
          <!-- type & description -->
          <div class="vx-row flex items-center justify-right ">
            <table>
              <tr>
                <td class="font-semibold ">
                  <feather-icon
                    icon="PackageIcon"
                    class="IconsColor ml-1 mr-1"
                    svgClasses="w-8 h-8"
                  />
                  <span class="align-top">
                    {{ FormData.CargoType }}
                  </span>
                </td>
              </tr>
              <tr v-if="FormData.CargoDescription">
                <td class="font-semibold pb-3 pr-10 pl-10">
                  <pre
                    style="white-space:pre-line !important"
                    class="align-top text-sm"
                  >
                  {{ FormData.CargoDescription }}
                </pre
                  >
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-row flex items-center justify-right pl-10">
            <table>
              <tr>
                <td>
                  {{ $t("CargoValue") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold pb-6">
                  {{ FormData.CargoValue | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  {{ $t("CargoWeight") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold pb-6 ">
                  {{ FormData.CargoWeight | numFormat("###,##0.00") }}
                  {{ $t(FormData.CargoWeightUnit) }}
                </td>
              </tr>
            </table>

            <!-- rating -->
            <table v-if="history">
              <tr>
                <td>
                  {{ $t("Rating") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold pb-6">
                  <star-rating
                    v-model="FormData.Rating"
                    v-bind:max-rating="5"
                    :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    inactive-color="gray"
                    active-color="orange"
                    v-bind:read-only="true"
                    v-bind:show-rating="false"
                    v-bind:round-start-rating="false"
                    v-bind:star-size="20"
                  >
                  </star-rating>
                </td>
              </tr>
            </table>

            <!-- CargoInsurance -->
            <table>
              <tr>
                <td>
                  <span class="align-top">{{ $t("CargoInsurance") }} </span>
                </td>
              </tr>
              <tr>
                <td
                  class="font-semibold pb-6"
                  v-if="FormData.Insurance == true"
                >
                  {{ $t("Yes") }}
                </td>
                <td
                  class="font-semibold pb-6"
                  v-if="FormData.Insurance == false"
                >
                  {{ $t("No") }}
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-row flex items-center justify-right pl-10 ">
            <!-- PaymentMethod -->
            <table v-if="inprogress || history">
              <tr>
                <td class="pb-4">
                  {{ $t("PaymentMethod") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold pb-6 ">
                  {{ $t(FormData.PaymentMethod) }}
                </td>
              </tr>
            </table>

            <!-- Paymentstatus -->
            <table v-if="inprogress || history">
              <tr>
                <td>
                  <span class="align-top"> {{ $t("PaymentStatus") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold pb-6">
                  {{ $t(FormData.PaymentStatus) }}
                </td>
              </tr>
            </table>

            <!-- amount -->
            <table v-if="inprogress || history">
              <tr>
                <td class="pb-4">
                  {{ $t("Amount") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold pb-6 ">
                  {{ FormData.PriceWithVAT | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
            </table>

            <table v-if="FormData.Insurance">
              <tr>
                <td>
                  <span class="align-top">{{ $t("InsuranceValue") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold pb-6 ">
                  {{ FormData.InsuranceValue | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
            </table>

            <table v-if="FormData.Insurance">
              <tr>
                <td>
                  <span class="align-top">{{ $t("InsurancePolicyNo") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">
                  {{ FormData.InsurancePolicyNo }}
                </td>
              </tr>
            </table>

            <table
              v-if="FormData.Status == 'BS14' || FormData.Status == 'BS11'"
            >
              <tr>
                <td>
                  <span class="align-top">{{ $t("ClosingDate") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">
                  {{ FormData.ClosingDate | formatDate }}
                </td>
              </tr>
            </table>
          </div>

          <vs-divider />
          <!-- driver -->
          <div class="ml-2 mr-2" v-if="FormData.DriverId">
            <div class="vx-row">
              <table>
                <tr>
                  <td color="primary" class="font-semibold pb-3">
                    <span class="text-xl text-primary">
                      {{ $t("DriverDetails") }}
                    </span>
                  </td>
                </tr>
              </table>
            </div>

            <div class="vx-row pl-10">
              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("DriverName") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold pb-6 ">
                    {{ driverData.firstName }}
                    <!-- {{ driverData.lastName }} -->
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("PhoneNumber") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold pb-6 ">
                    <a :href="`tel:${driverData.PhoneNumber}`">
                      <span :dir="$vs.rtl ? 'ltr' : 'ltr'">
                        {{ driverData.PhoneNumber }}
                      </span>
                    </a>
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("LicensePlate") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold pb-6 ">
                    {{ $t(driverData.LicensePlate) }}
                  </td>
                </tr>
              </table>
            </div>

            <div class="vx-row pl-10">
              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("VehicleMake") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold pb-6 ">
                    {{ $t(driverData.VehicleMake) }}
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("VehicleModel") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold pb-6 ">
                    {{ $t(driverData.VehicleModel) }}
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("VehicleColor") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold pb-6 ">
                    {{ $t(driverData.VehicleColor) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!-- the right side -->
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
                  <td class="font-semibold pb-6 break-normal">
                    {{ FormData.StPlaceDesicription }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <vs-divider position="right">
                      <feather-icon
                        icon="XIcon"
                        class="IconsColor"
                        style="color:#EA5455"
                        svgClasses="w-4 h-4"
                      />
                      <span class="align-top text-danger">
                        {{ $t(FormData.NumberOfTrips) }}
                        {{ $t("Trips") }}
                      </span>
                    </vs-divider>
                  </td>
                </tr>
                <div v-if="FormData.Stops">
                  <div v-for="(item, index) in FormData.Stops" :key="index">
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
                      <td class="font-semibold break-normal">
                        {{ item.PlaceDescription }}
                      </td>
                    </tr>
                  </div>
                </div>
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
                  <td class="font-semibold pb-6 break-normal">
                    {{ FormData.EnPlaceDesicription }}
                  </td>
                </tr>

                <!-- divider -->
              </table>
            </div>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import StarRating from "vue-star-rating";
import moment from "moment";

export default {
  data() {
    return {
      NoDriverFound: false,
      driverData: {},
      WyPoints: [],
      FormData: {
        VehicleType: "",
        VehicleOption: "",
        NumberOfTrips: "",
        Height: "",
        Length: "",
        StLongitude: "",
        StLatitude: "",
        StPlaceId: "",
        StartCity: "",
        StartCountry: "",
        StartCountryCode: "",
        StartState: "",
        StPlaceDesicription: "",
        EnLongitude: "",
        EnLatitude: "",
        EnPlaceId: "",
        EndCountry: "",
        EndCountryCode: "",
        EndCity: "",
        EndState: "",
        EnPlaceDesicription: "",
        PaymentStatus: ""
      },
      distance: "",
      duration: "",
      Biadjo_not_found: false,
      StartLink: "https://maps.google.com/maps?q=@",
      EndLink: "&17z",
      inprogress: false,
      history: false,
      selecting: false
    };
  },
  components: {
    StarRating
  },
  computed: {},
  methods: {
    getStatusColor(status) {
      if (status == "BS3" || status == "BS1" || status == "BS2") {
        return "#F8BD30";
      }
      if (status == "BS4") {
        return "dark";
      }
      if (
        status == "BS5" ||
        status == "BS6" ||
        status == "BS7" ||
        status == "BS8" ||
        status == "BS9" ||
        status == "BS10"
      ) {
        return "primary";
      }
      if (status == "BS11") {
        return "#039BE5";
      }
      if (status == "BS12" || status == "BS13" || status == "BS14") {
        return "dark";
      }
      if (status == "BS15" || status == "BS16") {
        return "danger";
      }
    },
    getOrderStatusColor(status) {
      if (status == "AS1") {
        return "success";
      }
      if (status == "AS2") {
        return "danger";
      }
      if (status == "AS3") {
        return "warning";
      }
      return "primary";
    },

    Back() {
      this.$router.go(-1);
    },
    fetchDistance(origin, dest) {
      return new Promise(async (resolve, reject) => {
        let response;
        let origin1 = origin;
        let destinationA = dest;
        const waypts = [];
        var DirectionsService = new google.maps.DirectionsService();
        if (this.WyPoints.length > 0) {
          for (let i = 0; i < this.WyPoints.length; i++) {
            waypts.push({
              location: new google.maps.LatLng(
                Number(this.WyPoints[i].Latitude),
                Number(this.WyPoints[i].Longitude)
              ),
              stopover: true
            });
          }
          DirectionsService.route(
            {
              origin: await {
                lat: Number(origin.lat),
                lng: Number(origin.lng)
              },
              destination: await {
                lat: Number(dest.lat),
                lng: Number(dest.lng)
              },
              waypoints: waypts,
              optimizeWaypoints: true,
              // drivingOptions: {
              //   departureTime: new Date(Date.now() + 1000), // for the time N milliseconds from now.
              //   trafficModel: "optimistic"
              // },
              unitSystem: google.maps.UnitSystem.METRIC,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            },
            (response, status) => {
              if (status === "OK") {
                this.distance = 0;
                this.duration = 0;

                var myroute = response.routes[0];
                for (let i = 0; i < myroute.legs.length; i++) {
                  this.distance += myroute.legs[i].distance.value;
                  this.duration += myroute.legs[i].duration.value;
                }
                var num = this.duration / 60;
                var hours = num / 60;
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);
                let X;
                if (rhours > 0) {
                  X =
                    rhours +
                    " " +
                    this.$t("Hour") +
                    " " +
                    rminutes +
                    " " +
                    this.$t("Minute");
                } else {
                  X = rminutes + " " + this.$t("Minute");
                }
                this.duration = X;
                this.distance = this.distance / 1000 + " " + this.$t("KM");
              }
            }
          );
        } else {
          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: await [origin1],
              destinations: await [destinationA],
              travelMode: "DRIVING",
              unitSystem: google.maps.UnitSystem.METRIC
              // avoidHighways: false,
              // avoidTolls: false
            },
            (resp, status) => {
              if (status !== google.maps.DistanceMatrixStatus.OK) {
                response = reject(status);
                this.distance = "";
                this.duration = "";
              } else {
                response = resolve(resp);
                this.distance = resp.rows[0].elements[0].distance.text;
                this.duration = resp.rows[0].elements[0].duration.text;
              }
            }
          );
        }
      });
      return response;
    },
    ResendBiadjoRequest() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.$route.params.Id;
      this.$store
        .dispatch("BiadjoList/ResendBiadjoRequest", Biadjo)
        .then(response => {
          if (response.data == true) {
            this.GetBiadjo();

            this.$vs.loading.close();
            window.showSuccess();
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    GetBiadjo() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.$route.params.Id;
      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(response => {
          if (response.data != null) {
            if (response.data.Stops) {
              if (response.data.Stops.length > 0) {
                for (let i = 0; i < response.data.Stops.length; i++) {
                  const element = response.data.Stops[i];
                  let LatLngObj = {};
                  LatLngObj.Latitude = element.Latitude;
                  LatLngObj.Longitude = element.Longitude;
                  this.WyPoints.push(LatLngObj);
                }
              }
            }
            if (response.data.Status == "BS12") {
              this.NoDriverFound = true;
            }
            if (response.data.DriverId) {
              this.GetDriver(response.data.DriverId);
            }
            if (
              response.data.Status == "BS1" ||
              response.data.Status == "BS2" ||
              response.data.Status == "BS3" ||
              response.data.Status == "BS12"
            ) {
              this.selecting = true;
            } else if (
              response.data.Status == "BS11" ||
              response.data.Status == "BS13" ||
              response.data.Status == "BS14" ||
              response.data.Status == "BS15" ||
              response.data.Status == "BS16"
            ) {
              this.history = true;
            } else {
              this.inprogress = true;
            }
            window.AllowToAccessCurrentBiadjo(
              response.data.ClientCompanyId,
              response.data.UserId
            );
            this.FormData = response.data;
            if (
              this.FormData.StLongitude != 0 &&
              this.FormData.StLatitude != 0 &&
              this.FormData.EnLongitude != 0 &&
              this.FormData.EnLatitude != 0
            ) {
              let orgin = {
                lat: this.FormData.StLatitude,
                lng: this.FormData.StLongitude
              };
              let dest = {
                lat: this.FormData.EnLatitude,
                lng: this.FormData.EnLongitude
              };
              window
                .checkAndAttachMapScript()
                .then(response => this.fetchDistance(orgin, dest));
            }
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.Biadjo_not_found = true;
          window.showError();
        });
    },

    GetDriver(DriverId) {
      this.$vs.loading();

      let driver = {};
      driver.DriverId = DriverId;
      this.$store
        .dispatch("BiadjoList/GetDriverById", driver)
        .then(response => {
          if (response.status == 200) {
            this.driverData = response.data;
            this.$vs.loading.close();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          return;
        });
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    this.GetBiadjo();
  }
  // async mounted() {
  //   await window.checkAndAttachMapScript(this.fetchDistance);
  // }
};
</script>

<style lang="scss">
.IconsColor {
  color: #27abbe;
}
#avatar-col {
  width: 10rem;
}
table {
  td {
    vertical-align: top;
    min-width: 150px;
    padding-bottom: 20px !important;
    word-break: break-all;
  }
  tr {
    min-height: 48px;
    height: 48px;
  }

  &:not(.permissions-table) {
    td {
      @media screen and (max-width: 370px) {
        display: block;
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
