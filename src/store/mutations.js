/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

const mutations = {
  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value;
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val;
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val;
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val;
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width;
  },
  UPDATE_NotificationList(state, val) {
    var Obj = {};
    Obj.Biadjo_ID = val.data.Biadjo_ID || "";
    Obj.NotificationId = val.data.NotificationId;
    Obj.Type = val.data.Type;
    Obj.Seen = false;
    state.NotificationList.push(Obj);
  },
  RemoveFrom_NotificationList(state, val) {
    state.NotificationList.splice(val, 1);
  },
  update_NotificationSeen(state, val) {
    state.NotificationList[val].Seen = true;
  },

  // VxAutoSuggest

  UPDATE_STARRED_PAGE(state, user) {
    // find item index in search list state
    const index = state.navbarSearchAndPinList.data.findIndex(
      item => item.index == user.index
    );

    // update the main list
    state.navbarSearchAndPinList.data[index].highlightAction = user.val;

    // if val is true add it to starred else remove
    if (user.val) {
      state.starredPages.push(state.navbarSearchAndPinList.data[index]);
    } else {
      // find item index from starred pages
      const index = state.starredPages.findIndex(
        item => item.index == user.index
      );

      // remove item using index
      state.starredPages.splice(index, 1);
    }
  },

  // Navbar-Vertical

  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10);
    state.starredPages = list.concat(starredPagesMore);
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp = false;
    let lastItemInStarredLimited = state.starredPages[10];
    const starredPagesLimited = state.starredPages.slice(0, 10);
    state.starredPages = starredPagesLimited.concat(list);

    state.starredPages.slice(0, 10).map(i => {
      if (list.indexOf(i) > -1) {
        downToUp = true;
      }
    });

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited);
    }
  },

  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY(state, val) {
    state.bodyOverlay = val;
  },
  UPDATE_PRIMARY_COLOR(state, val) {
    state.themePrimaryColor = val;
  },
  UPDATE_THEME(state, val) {
    state.theme = val;
  },
  UPDATE_WINDOW_WIDTH(state, width) {
    state.windowWidth = width;
  },
  UPDATE_WINDOW_SCROLL_Y(state, val) {
    state.scrollY = val;
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {
    // Get Data localStorage
    let userInfo =
      JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser;

    for (const property of Object.keys(payload)) {
      // if (user[property] != null) {
      // If some of user property is null - user default property defined in state.AppActiveUser
      state.AppActiveUser[property] = payload[property];
      // Update key in localStorage
      userInfo[property] = payload[property];
      // }
    }
    // Store data in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  REMOVE_USER_STORE(state) {
    state.AppActiveUser = {};
  },
  // clear storage
  CLEAR_USER_INFO() {
    localStorage.removeItem("userInfo");
  }
};

export default mutations;
