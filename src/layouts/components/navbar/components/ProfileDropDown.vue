<template>
  <div>
    <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo">
      <div class="text-right leading-tight hidden sm:block">
        <p class="font-semibold">{{ firstName }} {{ lastName }}</p>
        <small>{{ $t(AccountType) }}</small>
      </div>

      <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <div class="con-img ml-3">
          <img
            v-if="ProfilePic"
            key="onlineImg"
            :src="ProfilePic"
            alt="user-img"
            width="40"
            height="40"
            class="rounded-full shadow-md cursor-pointer block"
          />
          <img
            v-else
            key="Default"
            src="@/assets/images/pages/DefaultProfilePic.png"
            alt="Default-user-img"
            width="40"
            height="40"
            class="rounded-full shadow-md cursor-pointer block"
          />
        </div>

        <vs-dropdown-menu class="vx-navbar-dropdown">
          <ul style="min-width: 12rem;">
            <router-link
              :to="{
                name: 'UserPersonalDetails'
                //params: { Id: this.$store.state.AppActiveUser.PhoneNumber }
              }"
            >
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">{{ $t("PersonalProfile") }}</span>
              </li>
            </router-link>
            <router-link :to="'/user/ResetPasswordByUser'">
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <feather-icon icon="LockIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">{{ $t("ResetPassword") }}</span>
              </li>
            </router-link>

            <vs-divider class="m-1" />

            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="logout"
            >
              <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">{{ $t("Logout") }}</span>
            </li>
          </ul>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>

    <div class="the-navbar__user-meta flex items-center" v-else>
      <div class="text-right leading-tight hidden sm:block">
        <p class="font-semibold">LOGIN</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    firstName() {
      return this.$store.state.AppActiveUser.firstName;
    },
    lastName() {
      return this.$store.state.AppActiveUser.lastName;
    },
    AccountType() {
      return this.$store.state.AppActiveUser.AccountType;
    },
    ProfilePic() {
      return this.$store.state.AppActiveUser.ProfilePicture;
    }
  },
  methods: {
    logout() {
      this.$store.commit("CLEAR_USER_INFO", null, { root: true });
      this.$store.dispatch("auth/logout");
    },

    mounted() {
      if (!this.activeUserInfo) {
        this.$router.push("user/login/login");
      }
    }
  }
};
</script>
