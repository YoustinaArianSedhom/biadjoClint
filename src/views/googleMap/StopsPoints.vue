<template>
  <div>
    <div>
      <div class="pac-card" ref="card" id="pac-card">
        <div id="pac-container">
          <input
            id="pac-input"
            ref="input"
            name="SearchInput"
            type="text"
            :placeholder="$t('PickupStopLocation')"
          />
        </div>
      </div>
      <vs-button
        ref="Button"
        id="Button"
        class="mb-2"
        v-on:click="$emit('close')"
        @click="Close"
        :disabled="StopPointLocation.Latitude == null"
        >{{ $t("SelectLocation") }}</vs-button
      >
      <div ref="map" id="map"></div>
      <!-- <div ref="infowindow" id="infowindow-content"> -->
      <!-- <img src="" width="16" height="16" id="place-icon" /> -->
      <!-- <span id="place-name" class="title"></span><br />
        <span id="place-address"></span>
      </div> -->
    </div>
    <div ref="target" id="target" class="center"></div>
  </div>
</template>
<script>
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
export default {
  props: {
    StopPointLocation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      location: null,
      Hidden: false,
      latitude: 29.916852,
      interval: null,
      longitude: 31.260353,
      marker: new google.maps.Marker(),
      autocomplete: null,
      circle: null,
      checkLocationAllowed: false,
      NotAllowedToDoARequest: false,
      AllowMsg: false,
      timer: 3,
      Autocomplete: new google.maps.places.Autocomplete()
    };
  },
  methods: {
    createAccuracyCircle(LatLng, accuracy, map) {
      var populationOptions = {
        strokeColor: "#3B6077",
        strokeOpacity: 0.2,
        strokeWeight: 1,
        fillColor: "#27ABBE",
        fillOpacity: 0.2,
        map: map,
        center: LatLng,
        radius: accuracy
      };
      this.drawCircle(populationOptions);
    },
    drawCircle(Obj) {
      if (Obj.radius) {
        this.circle = new google.maps.Circle(Obj);
      } else {
        this.circle.setMap(null);
      }
    },
    Close() {
      this.$store.commit("BiadjoList/StopPointLocationData", null);
      this.$emit("CloseWayPointsMap", this.StopPointLocation);
    },
    initLocationSearch() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 30.015836, lng: 31.253561 },
        zoom: 13,
        mapTypeId: "roadmap",
        mapTypeControl: false
      });
      // google.maps.event.addListenerOnce(map, "idle", () => {
      var geocoder = new google.maps.Geocoder();
      // var infowindow = new google.maps.InfoWindow();
      // var infowindowContent = this.$refs.infowindow;
      // infowindow.setContent(infowindowContent);
      var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        anchorPoint: new google.maps.Point(0, -29),
        icon: { url: require("@/assets/images/Map Icon-A.png") }
      });

      navigator.permissions.query({ name: "geolocation" }).then(result => {
        if (result.state === "granted") {
          this.NotAllowedToDoARequest = false;
        } else if (result.state === "prompt") {
          showButtonToEnableMap();
        } else if (result.state === "denied") {
          // this.$vs.loading({
          //   // text: "Please allow location to access current page...",
          //   type: this.type
          //   // color: "#EA5455"
          //   // background: "#EA5455",
          //   // scale: 1,
          //   // opacity: 0.2
          // });
          this.$vs.loading({
            type: "radius",
            text: this.$t("AllowLocation"),
            color: "#EA5455",
            background: "rgb(255, 255, 255)"
          });
          // alert("Please enable location to get your coords");
          // window.location("chrome://settings/content/location");
        }
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var initialLocation = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          if (this.$store.state.BiadjoList.StopPointLocationData) {
            var latlng = {
              lat: parseFloat(
                this.$store.state.BiadjoList.StopPointLocationData.Latitude
              ),
              lng: parseFloat(
                this.$store.state.BiadjoList.StopPointLocationData.Longitude
              )
            };
          } else {
            var latlng = {
              lat: parseFloat(position.coords.latitude),
              lng: parseFloat(position.coords.longitude)
            };
          }
          var accuracy = position.coords.accuracy;

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                if (results[0].geometry.location) {
                  var DataObj = {};
                  map.setCenter(results[0].geometry.location);
                  marker.setPosition(results[0].geometry.location);
                  this.createAccuracyCircle(
                    results[0].geometry.location,
                    accuracy,
                    map
                  );
                  map.setZoom(17); // Why 17? Because it looks good.
                  var latitude = results[0].geometry.location.lat();
                  var longitude = results[0].geometry.location.lng();
                  DataObj.Latitude = results[0].geometry.location.lat();
                  DataObj.Longitude = results[0].geometry.location.lng();
                  DataObj.PlaceId = results[0].place_id;
                  DataObj.PlaceDescription = results[0].formatted_address;

                  this.StopPointLocation = DataObj;
                } else {
                  map.fitBounds(results[0].geometry.viewport);
                }
              }
            }
          });
        });
      }
      // do something only the first time the map is loaded
      var autocomplete = new google.maps.places.Autocomplete(this.$refs.input, {
        // types: ["geocode"],
        radius: 5000
      });
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        this.$refs.card
      );
      var Button = document.getElementById("Button");
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(Button);

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);

      // Set the data fields to return when the user selects a place.
      autocomplete.setFields([
        "address_components",
        "place_id",
        "geometry",
        "name",
        "formatted_address"
      ]);

      var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        anchorPoint: new google.maps.Point(0, -29),
        icon: { url: require("@/assets/images/Map Icon-A.png") }
      });

      google.maps.event.addListener(map, "dragend", () => {
        marker.setPosition(map.getCenter());

        var latitude = map.getCenter().lat();
        var longitude = map.getCenter().lng();
        var latlng = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              if (results[0].geometry.location) {
                var DataObj = {};
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                this.createAccuracyCircle(
                  results[0].geometry.location,
                  null,
                  map
                );

                map.setZoom(17); // Why 17? Because it looks good.
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                DataObj.Latitude = results[0].geometry.location.lat();
                DataObj.Longitude = results[0].geometry.location.lng();
                DataObj.PlaceId = results[0].place_id;
                DataObj.PlaceDescription = results[0].formatted_address;

                this.StopPointLocation = DataObj;
              } else {
                map.fitBounds(results[0].geometry.viewport);
              }
            }
          }
        });
      });

      google.maps.event.addListener(marker, "dragend", () => {
        // infowindow.close();
        var latitude = marker.getPosition().lat();
        var longitude = marker.getPosition().lng();
        var latlng = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              if (results[0].geometry.location) {
                var DataObj = {};
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                this.createAccuracyCircle(
                  results[0].geometry.location,
                  null,
                  map
                );
                map.setZoom(17); // Why 17? Because it looks good.
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                DataObj.Latitude = results[0].geometry.location.lat();
                DataObj.Longitude = results[0].geometry.location.lng();
                DataObj.PlaceId = results[0].place_id;
                DataObj.PlaceDescription = results[0].formatted_address;

                this.StopPointLocation = DataObj;
              } else {
                map.fitBounds(results[0].geometry.viewport);
              }
              // infowindowContent.children["place-name"].textContent =
              //   results[0].address_components[0].short_name;
              // infowindowContent.children["place-address"].textContent =
              //   results[0].formatted_address;
              // infowindow.open(map, marker);
            } else {
              window.showError();
            }
          } else {
            window.showError();
          }
        });
      });
      autocomplete.addListener("place_changed", () => {
        // infowindow.close();

        marker.setVisible(false);
        // var place = autocomplete.getPlace().geometry.location.lat();
        // print Details for Request Biadjo
        var place = autocomplete.getPlace();

        if (!place.place_id) {
          return;
        }
        geocoder.geocode({ placeId: place.place_id }, (results, status) => {
          if (status !== "OK") {
            window.alert("Geocoder failed due to: " + status);
            return;
          }
          map.setCenter(place.geometry.location);
          // Set the position of the marker using the place ID and location.
          marker.setPosition(place.geometry.location);
          this.createAccuracyCircle(results[0].geometry.location, null, map);
          map.setZoom(17); // Why 17? Because it looks good.
          var AutoCompleteDataObj = {};
          AutoCompleteDataObj.Latitude = place.geometry.location.lat();
          AutoCompleteDataObj.Longitude = place.geometry.location.lng();
          AutoCompleteDataObj.PlaceId = place.place_id;
          AutoCompleteDataObj.PlaceDescription = place.formatted_address;

          this.StopPointLocation = AutoCompleteDataObj;
          marker.setVisible(true);
        });
      });
    }
  },
  mounted() {
    //   var input = document.getElementById("pac-input");
    //   input.click(function() {
    //     var rBtnVal = $(this).val();
    //     if (rBtnVal == "yes") {
    //       input.attr("readonly", false);
    //     } else {
    //       input.attr("readonly", false);
    //     }
    //   });
    //   setTimeout(() => {
    window.checkAndAttachMapScriptGoogleMaps(this.initLocationSearch);
    //   }, 3 * 1000);
  },
  created() {
    this.$vs.loading();

    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    setTimeout(() => {
      this.$vs.loading.close();
    }, 3 * 1000);
    // let recaptchaScript = document.createElement("script");
    // recaptchaScript.setAttribute(
    //   "src",
    //   `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&libraries=places&language=${this.$i18n.locale}`
    // );
    // document.head.appendChild(recaptchaScript);
    // setTimeout(() => {
    // }, 3 * 1000);
  }
};
</script>

<style>
.title-loading {
  font-size: 25px;
  color: #ea5455;
  /* font-family: Cairo; */
}
#map {
  width: 100% !important;
  height: 400px;
}
.MapClass {
  width: 100% !important;
}
/* Optional: Makes the sample page fill the window. */
#description {
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
}
.pac-card {
  margin: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  font-family: Roboto;
  border-radius: 25px;
  left: 10% !important;
  width: 70%;
}
#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}
.gm-style .gm-style-iw-t {
  margin-bottom: 20px;
}

#map #infowindow-content {
  display: inline;
}
#description {
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
}

#pac-container {
  padding-bottom: 6px;
  margin-right: 12px;
}

.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 300;
}

#pac-input {
  border: #fff;
  background-color: #fff;
  font-size: 15px;
  font-weight: 300;
  margin: 5px;
  padding: 5px;
  width: 80% !important;
  padding-left: 30px;
  padding-top: 10px;
  margin-left: 20px;
}

#pac-input:focus {
  border-color: #27abbe;
}

#title {
  color: #fff;
  background-color: #27abbe;
  font-size: 25px;
  font-weight: 500;
  padding: 6px 12px;
}
</style>
