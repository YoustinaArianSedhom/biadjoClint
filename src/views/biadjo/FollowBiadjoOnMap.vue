<template>
  <div>
    <vs-button
      class="mr-3 mb-2"
      @click="Back"
      type="border"
      color="warning"
      icon-pack="feather"
    >
      {{ $t("Back") }}
    </vs-button>

    <vs-chip id="BiadjoStatus" class=" text-lg" :color="getStatusColor(CurrBS)">
      {{ $t("BiadjoNo") }} {{ $route.params.Id }} , {{ $t(CurrBS) }}</vs-chip
    >

    <div type="text" ref="search" id="location"></div>
  </div>
</template>
<script>
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
export default {
  data() {
    return {
      Status: null,
      location: null,
      marker: new google.maps.Marker(),
      map: new google.maps.Map(document.getElementById("location")),
      directionsService: new google.maps.DirectionsService(),
      directionsDisplay: new google.maps.DirectionsRenderer(),
      directionsRenderer: new google.maps.DirectionsRenderer(),
      marker: new google.maps.Marker(),
      transitLayer: null,
      distance: null,
      duration: null,
      infowindowDriving: null,
      position: null,
      icon: null,
      title: null,
      MarkerOptions: google.maps.MarkerOptions,
      DriverLocationLng: null,
      CurrentResponse: null,
      StartLat: null,
      StartLng: null,
      EndLat: null,
      EndLng: null,
      DriverID: null,
      interval: null,
      start_location: null,
      Stops: [],
      DriverMarker: null
    };
  },
  computed: {
    CurrBS() {
      return this.$store.state.BiadjoList.CurrBS;
    }
  },
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
    Back() {
      this.$router.go(-1);
    },
    initLocationSearch() {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.map = new google.maps.Map(document.getElementById("location"), {
        zoom: 5,
        backgroundColor: "#3B6077",
        // noClear: true,
        maxZoom: 20,
        minZoom: 5,
        mapTypeId: "roadmap" //satellite //hybrid //terrain
      });
      this.DriverMarker = new google.maps.Marker({
        map: this.map,
        icon: require("@/assets/images/DriverMarker.png"),
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      });

      var BiadjoStatus = document.getElementById("BiadjoStatus");
      if (BiadjoStatus) {
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
          BiadjoStatus
        );
      }
      this.directionsRenderer.setMap(this.map);
    },
    IsDriverStillOnRoute() {
      var Position = new google.maps.LatLng(this.StartLat, this.StartLng);
      // var xxx = new google.maps.Polyline(CurrentResponse.routes[0].overview_path);
      // var cascadiaFault = new google.maps.Polyline(
      //   CurrentResponse.routes[0].overview_path
      // );
      var paths = this.CurrentResponse.routes[0].overview_path;
      var polyline = new google.maps.Polyline({
        path: paths
      });
      if (
        new google.maps.geometry.poly.isLocationOnEdge(
          Position,
          polyline,
          0.001
        )
      ) {
        var myLatlng = new google.maps.LatLng(this.StartLat, this.StartLng);
        // map.setZoom(17);
        // this.DriverMarker.setMap(this.map);
        this.DriverMarker.setPosition(myLatlng);
      } else {
        this.directionsDisplay.setMap(null);
        this.calculateAndDisplayRoute();
      }
    },
    calculateAndDisplayRoute() {
      var StartLat = Number(this.StartLat);
      var StartLng = Number(this.StartLng);
      var EndLat = Number(this.EndLat);
      var EndLng = Number(this.EndLng);

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      // this.directionsRenderer.setMap(null);

      // this.directionsDisplay.setMap(map);
      const waypts = [];
      if (this.Stops && this.Stops.length > 0) {
        for (let i = 0; i < this.Stops.length; i++) {
          waypts.push({
            location: new google.maps.LatLng(
              this.Stops[i].Latitude,
              this.Stops[i].Longitude
            ),
            stopover: true
          });
        }

        this.directionsService.route(
          {
            origin: { lat: Number(this.StartLat), lng: Number(this.StartLng) },
            destination: { lat: Number(this.EndLat), lng: Number(this.EndLng) },
            // unitSystem: google.maps.UnitSystem.IMPERIAL, // Mile
            avoidHighways: false,
            avoidTolls: false,
            waypoints: waypts,
            optimizeWaypoints: true,
            drivingOptions: {
              departureTime: new Date(Date.now() + 1000), // for the time N milliseconds from now.
              trafficModel: "optimistic"
            },
            unitSystem: google.maps.UnitSystem.METRIC,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          },
          (response, status) => {
            if (status === "OK") {
              this.CurrentResponse = response;
              this.distance = response.routes[0].legs.distance;
              this.duration = response.routes[0].legs.duration;

              var legLength = response.routes[0].legs.length - 1;
              var startLeg = response.routes[0].legs[0];
              var endtLeg = response.routes[0].legs[legLength];
              this.directionsDisplay = new google.maps.DirectionsRenderer({
                map: this.map,
                directions: response,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#27ABBE",
                  strokeOpacity: 0.7,
                  strokeWeight: 5
                }
                // strokeColor: "#ff1493",
              });
              // this.DriverMarker.setMap(null);
              if (
                this.Status === "BS5" ||
                this.Status === "BS6" ||
                this.Status === "BS7"
              ) {
                // DriverMarker.setMap(null);
                // DriverMarker.setMap(map);

                var StartMarker = new google.maps.Marker({
                  position: endtLeg.end_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-A.png")
                });

                this.DriverMarker.setPosition(startLeg.start_location);
              }
              if (
                this.Status === "BS8" ||
                this.Status === "BS9" ||
                this.Status === "BS10"
              ) {
                var EndtMarker = new google.maps.Marker({
                  position: endtLeg.end_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-B.png")
                });

                this.DriverMarker.setPosition(startLeg.start_location);
              }
              if (
                this.Status === "BS1" ||
                this.Status === "BS2" ||
                this.Status === "BS3" ||
                this.Status === "BS4" ||
                this.Status === "BS11" ||
                this.Status === "BS12" ||
                this.Status === "BS13" ||
                this.Status === "BS14"
              ) {
                var StartMarker = new google.maps.Marker({
                  position: startLeg.start_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-A.png")
                });
                var EndtMarker = new google.maps.Marker({
                  position: endtLeg.end_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-B.png")
                });
              }
              for (var i = 0; i < waypts.length; i++) {
                var wayPointMarker = new google.maps.Marker({
                  map: this.map,
                  size: new google.maps.Size(2, 3),
                  icon: require("@/assets/images/WayPointMarker.png"),
                  title: "Stop Point!"
                });
                wayPointMarker.setPosition(waypts[i].location);
              }

              this.directionsDisplay.setMap(this.map);
              // this.directionsRenderer.setMap(this.map);

              this.directionsDisplay.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      } else {
        this.directionsService.route(
          {
            origin: { lat: Number(this.StartLat), lng: Number(this.StartLng) },
            destination: { lat: Number(this.EndLat), lng: Number(this.EndLng) },
            // unitSystem: google.maps.UnitSystem.IMPERIAL, // Mile
            avoidHighways: false,
            avoidTolls: false,
            drivingOptions: {
              departureTime: new Date(Date.now() + 1000), // for the time N milliseconds from now.
              trafficModel: "optimistic"
            },
            unitSystem: google.maps.UnitSystem.METRIC,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          },
          (response, status) => {
            if (status === "OK") {
              this.CurrentResponse = response;
              this.distance = response.routes[0].legs.distance;
              this.duration = response.routes[0].legs.duration;

              var legLength = response.routes[0].legs.length - 1;
              var startLeg = response.routes[0].legs[0];
              var endtLeg = response.routes[0].legs[legLength];
              this.directionsDisplay = new google.maps.DirectionsRenderer({
                map: this.map,
                directions: response,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#27ABBE",
                  strokeOpacity: 0.7,
                  strokeWeight: 5
                }
                // strokeColor: "#ff1493",
              });

              if (
                this.Status === "BS5" ||
                this.Status === "BS6" ||
                this.Status === "BS7"
              ) {
                // DriverMarker.setMap(null);
                // DriverMarker.setMap(map);
                this.DriverMarker.setPosition(startLeg.start_location);

                var StartMarker = new google.maps.Marker({
                  position: endtLeg.end_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-A.png")
                });
              }
              if (
                this.Status === "BS8" ||
                this.Status === "BS9" ||
                this.Status === "BS10"
              ) {
                this.DriverMarker.setPosition(startLeg.start_location);

                var EndtMarker = new google.maps.Marker({
                  position: endtLeg.end_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-B.png")
                });
              }
              if (
                this.Status === "BS1" ||
                this.Status === "BS2" ||
                this.Status === "BS3" ||
                this.Status === "BS4" ||
                this.Status === "BS11" ||
                this.Status === "BS12" ||
                this.Status === "BS13" ||
                this.Status === "BS14"
              ) {
                var StartMarker = new google.maps.Marker({
                  position: startLeg.start_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-A.png")
                });
                var EndtMarker = new google.maps.Marker({
                  position: endtLeg.end_location,
                  map: this.map,
                  anchorPoint: new google.maps.Point(0.5, 0.5),
                  icon: require("@/assets/images/Map Icon-B.png")
                });
              }
              // for (var i = 0; i < waypts.length; i++) {
              //   var wayPointMarker = new google.maps.Marker({
              //     map: this.map,
              //     icon: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
              //     title: "Hello World!"
              //   });
              //   wayPointMarker.setPosition(waypts[i].location);
              // }
              this.directionsDisplay.setMap(this.map);

              // this.directionsRenderer.setMap(this.map);

              this.directionsDisplay.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }
    },
    getDriverLocation() {
      var Driver = {};
      Driver.DriverID = this.DriverID;
      this.$store.dispatch("auth/getDriverLocation", Driver).then(response => {
        if (response.status == 200) {
          this.StartLat = Number(response.data.latitude);
          this.StartLng = Number(response.data.longitude);
          this.$vs.loading.close();
        }
      });
    },
    fetchData() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.$route.params.Id;
      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(response => {
          if (response.status == 200) {
            this.Status = response.data.Status;
            this.$store.commit(
              "BiadjoList/Update_CurrBS",
              response.data.Status
            );
            this.DriverID = response.data.DriverId;
            if (response.data.Stops) {
              this.Stops = response.data.Stops;
            }
            var Driver = {};
            Driver.DriverID = response.data.DriverId;
            if (
              this.Status === "BS5" ||
              this.Status === "BS6" ||
              this.Status === "BS7"
            ) {
              this.EndLat = response.data.StLatitude;
              this.EndLng = response.data.StLongitude;
              window
                .checkAndAttachMapScript()
                .then(resp => this.initLocationSearch());

              this.$store
                .dispatch("auth/getDriverLocation", Driver)
                .then(response => {
                  if (response.status == 200) {
                    this.StartLat = response.data.latitude;
                    this.StartLng = response.data.longitude;
                    this.$vs.loading.close();
                  }
                  this.calculateAndDisplayRoute();
                });
              let timerId = setInterval(() => {
                this.$store
                  .dispatch("auth/getDriverLocation", Driver)
                  .then(response => {
                    if (response.status == 200) {
                      this.StartLat = Number(response.data.latitude);
                      this.StartLng = Number(response.data.longitude);
                      // this.directionsDisplay.setMap(null);
                      // this.DriverMarker.setMap(null);
                      this.IsDriverStillOnRoute();
                    }
                  });
              }, 5000);
            }
            if (
              this.Status === "BS8" ||
              this.Status === "BS9" ||
              this.Status === "BS10"
            ) {
              this.EndLat = response.data.EnLatitude;
              this.EndLng = response.data.EnLongitude;
              window
                .checkAndAttachMapScript()
                .then(resp => this.initLocationSearch());

              this.$store
                .dispatch("auth/getDriverLocation", Driver)
                .then(response => {
                  if (response.status == 200) {
                    this.StartLat = response.data.latitude;
                    this.StartLng = response.data.longitude;
                    this.$vs.loading.close();
                  }
                  this.calculateAndDisplayRoute();
                });
              let timerId = setInterval(() => {
                this.$store
                  .dispatch("auth/getDriverLocation", Driver)
                  .then(response => {
                    if (response.status == 200) {
                      this.StartLat = Number(response.data.latitude);
                      this.StartLng = Number(response.data.longitude);
                      // this.directionsDisplay.setMap(null);
                      // this.DriverMarker.setMap(null);
                      this.IsDriverStillOnRoute();
                    }
                  });
              }, 5000);
            }
            if (
              this.Status === "BS1" ||
              this.Status === "BS2" ||
              this.Status === "BS3" ||
              this.Status === "BS4" ||
              this.Status === "BS11" ||
              this.Status === "BS12" ||
              this.Status === "BS13" ||
              this.Status === "BS14"
            ) {
              this.StartLat = response.data.StLatitude;
              this.StartLng = response.data.StLongitude;
              this.EndLat = response.data.EnLatitude;
              this.EndLng = response.data.EnLongitude;
              this.$vs.loading.close();
              window
                .checkAndAttachMapScript()
                .then(resp => this.initLocationSearch());
              this.calculateAndDisplayRoute();
            }

            this.$vs.loading.close();
          }
        })
        .catch(() => {
          this.$vs.loading.close();

          window.showError();
        });
    }

    // SetMarker() {
    //   //Remove previous Marker.
    //   if (this.DriverMarker != null) {
    //     this.DriverMarker.setMap(null);
    //   }
    //   //Set Marker on Map.
    //   var MyDriverLocation = new google.maps.LatLng(
    //     this.StartLat,
    //     this.StartLng
    //   );
    //   this.DriverMarker = new google.maps.Marker({
    //     position: MyDriverLocation,
    //     map: this.map,
    //     icon: require("@/assets/images/DriverMarker.png")
    //   });
    //   this.DriverMarker.setMap(map);
    //   //Set Marker on Map.
    // }
  },
  mounted() {},
  async created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    await window
      .checkAndAttachMapScript()
      .then(resp => this.initLocationSearch());
    this.fetchData();
  },
  watch: {},
  beforeDestroy() {
    location.reload("/");
  }
};
</script>

<style>
.MapClass {
  width: 100% !important;
}
#location {
  width: 100% !important;
  height: 500px;
  margin: auto;
}
.my-custom-class-for-label {
  width: 50px;
  height: 20px;

  border: 1px solid #eb3a44;
  border-radius: 5px;
  background: #fee1d7;
  text-align: center;
  line-height: 20px;
  font-weight: bold;
  font-size: 14px;
  color: #eb3a44;
}
</style>
