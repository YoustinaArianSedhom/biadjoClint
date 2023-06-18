<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="user_not_found"
    >
      <span>user record with id: {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'ClientProfile' }"
          class="text-inherit underline"
          >All Clients</router-link
        >
      </span>
    </vs-alert>
    <div id="user-data" v-if="user_data != undefined && IsNotExist == false">
      <vx-card class="mb-base" id="account-info">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.ProfilePicture" class="rounded w-full" />
            </div>
          </div> -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <!-- <vx-card> -->
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <!-- <td >
                  <vx-input-group class="w-1/2">
                    <vs-input v-model="user_data.firstName" :disabled="true" />
                  </vx-input-group>
                  </td>
                <td>
                  <vx-input-group class="w-1/2">
                    <vs-input v-model="user_data.lastName" :disabled="true" />
                  </vx-input-group>
                  
                </td> -->
                <td>
                  <vx-input-group>
                    <vs-input
                      v-model="user_data.FullName"
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                      :disabled="true"
                    />
                  </vx-input-group>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td class="font-semibold">{{ $t("Phone") }}</td>
                <td>
                  <vx-input-group class="">
                    <vs-input
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                      v-model="user_data.PhoneNumber"
                      :disabled="EditPhoneNo"
                    />

                    <template slot="append">
                      <div class="append-text btn-addon">
                        <vs-button
                          @click="SetEditPhoneNo"
                          v-if="EditPhoneNo"
                          color="primary"
                          type="filled"
                          icon-pack="feather"
                          icon="icon-edit-2"
                        ></vs-button>
                        <vs-button
                          @click="Search"
                          v-if="!EditPhoneNo"
                          color="success"
                          type="filled"
                          icon-pack="feather"
                          icon="icon-save"
                        ></vs-button>
                      </div>
                    </template>
                  </vx-input-group>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>
                  <vx-input-group class="mb-base">
                    <vs-input
                      v-model="user_data.Email"
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                      :disabled="EditEmail"
                    />

                    <template slot="append">
                      <div class="append-text btn-addon">
                        <vs-button
                          @click="SetEditEmail"
                          v-if="EditEmail"
                          color="primary"
                          type="filled"
                          icon-pack="feather"
                          icon="icon-edit-2"
                        ></vs-button>
                        <vs-button
                          @click="SaveEditEmail"
                          v-if="!EditEmail"
                          color="success"
                          type="filled"
                          icon-pack="feather"
                          icon="icon-save"
                        ></vs-button>
                      </div>
                    </template>
                  </vx-input-group>
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="vx-row flex-wrap m-4">
              <div class="mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  icon="icon-lock"
                  class="mr-4"
                  :to="{
                    name: 'ResetPasswordByUser'
                    //params: { Id: user_data.Id }
                  }"
                  >{{ $t("ResetPassword") }}</vs-button
                >
              </div>
              <div class="mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="mr-4"
                >
                  {{ $t("Back") }}</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
    <vx-card v-if="IsNotExist">
      <div class="w-full" v-if="!vertified">
        <div class="flex mb-4 mt-8">
          <div class="w-1/3 mr-2">
            <label class="text-sm opacity-75">{{
              $t("ConfirmationCode")
            }}</label>
            <vs-input class="mb-5 w-full" v-model="text" name="Text" />
            <span class="text-danger text-sm" v-show="errors.has('Text')">{{
              errors.first("Text")
            }}</span>
          </div>
          <div class="w-1/3 mt-6">
            <vs-button
              style="padding-left: 5px;padding-right: 5px;"
              class="mb-5 w-full"
              @click.prevent="SendText()"
              v-show="!IsClicked"
            >
              {{ $t("SendText") }}</vs-button
            >
            <vs-button v-show="IsClicked" :disabled="disable">
              {{ minutes }} : {{ seconds }}</vs-button
            >
          </div>
        </div>

        <div class="flex flex-wrap justify-center m-2 ">
          <vs-button
            class=""
            :disabled="text == ''"
            @click.prevent="VertifyCode()"
          >
            {{ $t("Continue") }}</vs-button
          >
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showEditPhoneNo: true,
      showEditEmail: true,
      user_data: {},
      user_not_found: false,
      userInfo: {},
      vertified: false,
      SendOTPModel: { PhoneNo: "", activationCode: "" },
      IsClicked: false,
      disable: true,
      minutes: 5,
      seconds: 0,
      text: "",
      IsNotExist: false
    };
  },
  computed: {
    EditPhoneNo() {
      return this.showEditPhoneNo;
    },
    EditEmail() {
      return this.showEditEmail;
    }
  },
  methods: {
    SetEditPhoneNo() {
      this.showEditPhoneNo = false;
    },
    SetEditEmail() {
      this.showEditEmail = false;
    },
    Search() {
      this.$vs.loading();
      this.$validator.validateAll().then(result => {
        if (result) {
          var checkPhone = {};
          checkPhone.PhoneNo = this.user_data.PhoneNumber.replace(/\s/g, "");

          this.$store
            .dispatch("auth/CheckPhoneNoExist", checkPhone)
            .then(response => {
              if (response.status == 200) {
                if (response.data.result == "true") {
                  window.showAlreadyExist();
                  this.$vs.loading.close();
                } else {
                  this.SendText();
                  this.$vs.loading.close();
                }
              }
            })
            .catch(() => {
              window.showError();
              this.$vs.loading.close();
            });
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
    },
    SendText() {
      this.$vs.loading();
      this.SendOTPModel.activationCode = this.randomNumber = Math.floor(
        Math.random() * (9999 - 1001) + 1000
      );
      this.SendOTPModel.PhoneNo = this.user_data.PhoneNumber.replace(/\s/g, "");

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("auth/SendOTPToUser", this.SendOTPModel)
            .then(res => {
              if (res.status == 200) {
                this.$vs.loading.close();
                this.StartTiming();
                this.IsNotExist = true;
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
    setTimer() {
      this.minutes = 5;
      this.seconds = 0;
    },
    StartTiming() {
      this.IsClicked = true;
      this.setTimer();
      this.innerSetInterval = window.setInterval(() => {
        if (this.minutes == 0 && this.seconds == 0) {
          clearInterval(this.innerSetInterval);
          this.IsClicked = false;

          return;
        }

        if (this.seconds > 0) {
          this.seconds = this.seconds - 1;
        } else {
          this.seconds = 59;

          if (this.minutes > 0) {
            this.minutes = this.minutes - 1;
          }
        }
      }, 1000);
    },
    VertifyCode() {
      //
      //this.$vs.loading();
      if (this.SendOTPModel.activationCode == this.text) {
        this.SaveEditPhoneNo();
        //this.$vs.loadin.close();
      } else {
        //this.$vs.loading.close();
        window.IncorrectCode();
        //this.vertified = true;
      }
    },
    SaveEditPhoneNo() {
      this.$vs.loading();
      var UserObj = {};
      UserObj.PhoneNo = this.user_data.PhoneNumber;
      UserObj.UserID = this.user_data.Id;

      this.$store
        .dispatch("auth/changePhoneNo", UserObj)
        .then(res => {
          if (res.status === 200) {
            if (res.data == 1) {
              this.userInfo.PhoneNumber = this.user_data.PhoneNumber;
              localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
              this.$store.dispatch("auth/refreshCurrentUser");
              window.showSuccess();
              this.showEditPhoneNo = true;
              this.IsNotExist = false;
              this.text = "";
            } else {
              window.showError();
            }
            this.$vs.loading.close();
            return;
          }
          this.$vs.loading.close();
        })
        .catch(err => {
          if (err.status === 400) {
            this.$vs.loading.close();
            window.showError();
            return;
          }
          this.$vs.loading.close();
        });
    },
    SaveEditEmail() {
      //debugger
      this.$vs.loading();

      var UserObj = {};
      UserObj.PhoneNo = this.user_data.PhoneNumber.replace(/\s/g, "");
      UserObj.NewEmail = this.user_data.Email;

      var JsonValue = {};
      JsonValue.PhoneNo = this.userInfo.PhoneNumber;

      this.$store
        .dispatch("auth/updateEmail", UserObj)
        .then(res => {
          if (res.status === 200) {
            if (res.data == 1) {
              this.$store.dispatch("auth/refreshCurrentUser");
              window.showSuccess();
              this.showEditEmail = true;
            } else {
              window.showError();
            }
            this.$vs.loading.close();
            return;
          }
          this.$vs.loading.close();
        })
        .catch(err => {
          if (err.status === 400) {
            this.$vs.loading.close();
            window.showError();
            return;
          }
          this.$vs.loading.close();
        });
    },
    Back() {
      this.$router.go(-1);
    }
  },
  created() {
    //
    this.$vs.loading();

    var JsonValue = {};
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    JsonValue.PhoneNo = this.userInfo.PhoneNumber;

    this.$store
      .dispatch("auth/fetchUserDetailsList", JsonValue)
      .then(res => {
        this.user_data = res.data;
        this.user_data.FullName =
          this.user_data.firstName + " " + this.user_data.lastName;
        this.$vs.loading.close();
      })
      .catch(err => {
        if (err.status === 400) {
          this.user_not_found = true;
          this.$vs.loading.close();
          return;
        }
        this.$vs.loading.close();
        console.error(err);
      });
    this.$vs.loading.close();
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-client-view {
  table {
    td {
      vertical-align: baseline !important;
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

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }
//  #account-info-col-1 {
//     width: calc(100% - 12rem) !important;
//     height:90px !important;
//   }

//   #account-info-col-2 {
//     width: calc(100% - 12rem) !important;
//     height:90px !important;
//   }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
