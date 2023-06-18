<template>
  <!-- NOTIFICATIONS -->
  <vs-dropdown vs-trigger-click class="cursor-pointer ">
    <feather-icon
      icon="BellIcon"
      class="cursor-pointer mt-1 sm:mr-6 mr-2"
      :badge="Notifications.length"
    />

    <vs-dropdown-menu
      class="notification-dropdown dropdown-custom vx-navbar-dropdown"
    >
      <div class="notification-top text-center p-5 bg-primary text-white ">
        <h3 class="text-white">{{ Notifications.length }} {{ $t("New") }}</h3>
        <!-- <p class="opacity-75">App Notifications</p> -->
      </div>

      <VuePerfectScrollbar
        class="scroll-area--data-list-add-new CustomHeight"
        :settings="settings"
      >
        <ul class="bordered-items pb-8 mb-4">
          <li
            v-for="(ntf, index) in Notifications"
            :key="index"
            class="flex justify-between px-4 py-4 notification cursor-pointer"
          >
            <div
              class="flex items-start w-full"
              @click="routeToNotificationPage(ntf, index)"
            >
              <!-- <feather-icon
                :icon="ntf.icon"
                :svgClasses="[
                  `text-${ntf.category}`,
                  'stroke-current mr-1 h-6 w-6'
                ]"
              ></feather-icon> -->
              <div class="mx-2">
                <span
                  class="font-medium block notification-title"
                  :class="[`font-${getStatus(ntf.Seen)}`]"
                  >{{ getTitle(ntf) }}</span
                >
                <small>{{ getMessage(ntf) }}</small>
              </div>
            </div>
            <div class="flex items-end">
              <vx-tooltip text="Mark As Read">
                <feather-icon
                  icon="BookOpenIcon"
                  svgClasses="stroke-current mr-2 ml-2 h-5 w-5 text-primary"
                  @click="markAsRead(index)"
                ></feather-icon>
              </vx-tooltip>
              <vx-tooltip text="Remove Notification">
                <feather-icon
                  icon="DeleteIcon"
                  @click="deleteNotification(index)"
                  svgClasses="stroke-current mr-2 ml-2 h-5 w-5 text-danger"
                ></feather-icon>
              </vx-tooltip>
            </div>
            <!-- <small class="mt-1 whitespace-no-wrap">{{
              elapsedTime(ntf.time)
            }}</small> -->
          </li>
        </ul>
      </VuePerfectScrollbar>

      <div
        class="checkout-footer fixed bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
      >
        <span>View All Notifications</span>
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    Notifications() {
      return this.$store.state.NotificationList;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
    markAsRead(ntf) {
      // this.$vs.loading();
      this.$store.commit("update_NotificationSeen", ntf);
      // Add mutation to update status to be true for current notification with index
    },
    deleteNotification(ntf) {
      //DELTE NOTIFICATIOB BY INDEX FROM ARRAY
      this.$store.commit("RemoveFrom_NotificationList", ntf);
    },
    getTitle(notification) {
      switch (notification.Type) {
        case "NewOffer":
          return this.$t("RecieveBiadjoRequest");

        case "NewBiadjoStatus":
          return this.$t("NewBiadjoStatus");

        case "OfferAccepted":
          return this.$t("OfferAccepted");

        case "AccountStatus":
          return this.$t("AccountStatus");

        case "BiadjoTimeNotification":
          return this.$t("BiadjoTimeNotification");

        default:
          return "";
      }
    },
    getMessage(notification) {
      switch (notification.Type) {
        case "NewOffer":
          return (
            this.$t("new_offer_message") + ": " + notification["Biadjo_ID"]
          );

        case "NewBiadjoStatus":
          return (
            this.$t("bodyNewBiadjoStatus") + ": " + notification["Biadjo_ID"]
          );

        case "OfferAccepted":
          return (
            this.$t("bodyOfferAccepted") + ": " + notification["Biadjo_ID"]
          );

        case "AccountStatus":
          return this.$t("account_status_message");

        case "BiadjoTimeNotification":
          return (
            this.$t("BiadjoTimeNotification") + ": " + notification["Biadjo_ID"]
          );

        default:
          return "";
      }
    },
    getStatus(notification) {
      switch (notification) {
        case true:
          return "thin";

        case false:
          return "semibold";

        default:
          return "thin";
      }
    },

    routeToNotificationPage(notification, index) {
      this.markAsRead(index);
      switch (notification.Type) {
        case "RecieveBiadjoRequest":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.Biadjo_ID }
            })
            .then(() => location.reload("/"));

          break;
        case "NewOffer":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.Biadjo_ID }
            })
            .then(() => location.reload("/"));

          break;
        case "NewBiadjoStatus":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.Biadjo_ID }
            })
            .then(() => location.reload("/"));
          break;
        case "OfferAccepted":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.Biadjo_ID }
            })
            .then(() => location.reload("/"));
          break;
        case "AccountStatus":
          this.$router
            .push({
              name: "UserPersonalDetails"
            })
            .then(() => location.reload("/"));
          break;
        case "BiadjoTimeNotification":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.Biadjo_ID }
            })
            .then(() => location.reload("/"));
          break;
      }
    }
  }
};
</script>
<style>
.CustomHeight {
  height: 50vh;
}
</style>
