/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
let AccountType = "kjnweq";
if (JSON.parse(localStorage.getItem("userInfo"))) {
  AccountType = JSON.parse(localStorage.getItem("userInfo")).AccountType;
}
export default [
  {
    url: "/",
    show: AccountType,
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
    i18n: "Home"
  },
  {
    url: null,
    name: "Biadjo",
    tagColor: "primary",
    show: AccountType,
    icon: "ActivityIcon",
    i18n: "Biadjo",
    submenu: [
      {
        url: "/RequestBiadjo",
        name: "RequestBiadjo",
        slug: "RequestBiadjo",
        icon: "ClipboardIcon",
        i18n: "RequestBiadjo"
      },
      {
        url: "/Selecting",
        name: "Selecting",
        slug: "Selecting",
        icon: "ClipboardIcon",
        i18n: "Selecting"
      },
      {
        url: "/InProgress",
        name: "InProgress",
        slug: "InProgress",
        icon: "ClipboardIcon",
        i18n: "InProgress"
      },
      {
        url: "/History",
        name: "History",
        slug: "History",
        icon: "ClipboardIcon",
        i18n: "History"
      }
    ]
  },
  {
    url: "/Wallet",
    show: AccountType,
    name: "Wallet",
    slug: "Wallet",
    icon: "DollarSignIcon",
    i18n: "Wallet"
  },

  {
    url: "/CompanyProfile",
    show: AccountType == "AT1" || AccountType == "AT3",
    name: "CompanyProfile",
    slug: "CompanyProfile",
    icon: "FileTextIcon",
    i18n: "CompanyProfile"
  },

  {
    url: "/CompanyUsers",
    show: AccountType == "AT1" || AccountType == "AT3",
    name: "CompanyUsers",
    tagColor: "primary",
    icon: "UsersIcon",
    i18n: "CompanyUsers",
    submenu: [
      {
        url: "/AddCompanyUser",
        name: "AddCompanyUser",
        slug: "AddCompanyUser",
        icon: "MenuIcon",
        i18n: "AddUser"
      },

      {
        url: "/CompanyUsers",
        name: "CompanyUsers",
        slug: "CompanyUsers",
        icon: "UsersIcon",
        i18n: "ViewUsers"
      }
    ]
  },

  {
    url: null,
    show: AccountType == "AT1" || AccountType == "AT2" || AccountType == "AT3",
    name: "CompanyTrips",
    tagColor: "primary",
    icon: "ActivityIcon",
    i18n: "CompanyTrips",

    submenu: [
      {
        url: "/SelectingTrips",
        name: "SelectingTrips",
        slug: "SelectingTrips",
        icon: "UsersIcon",
        i18n: "SelectingTrips"
      },

      {
        url: "/InProgressTrips",
        name: "InProgressTrips",
        slug: "InProgressTrips",
        icon: "UsersIcon",
        i18n: "InProgressTrips"
      },

      {
        url: "/HistoryTrips",
        name: "HistoryTrips",
        slug: "HistoryTrips",
        icon: "UsersIcon",
        i18n: "HistoryTrips"
      }
    ]
  },
  {
    url: "/SwitchIndividualToCompany",
    show: AccountType == "AT0",
    name: "SwitchIndividualToCompany",
    slug: "SwitchIndividualToCompany",
    icon: "UsersIcon",
    i18n: "SwitchIndividualToCompany"
  },
  {
    url: "/ContactUs",
    show: AccountType,
    name: "ContactUs",
    slug: "ContactUs",
    icon: "MailIcon",
    i18n: "ContactUs"
  }
];
