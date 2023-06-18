import Vue from "vue";
import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "./../router";
Vue.use(AclInstaller);

let initialRole = "Anonymous";
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo && userInfo.AccountType) {
  initialRole = userInfo.AccountType;
}
export default new AclCreate({
  initial: initialRole,
  // notfound: "/pages/Error404",
  notfound: "/pages/not-authorized",
  router,
  acceptLocalRules: true,
  globalRules: {
    Anonymous: new AclRule("Anonymous")
      .or("AT0")
      .or("AT1")
      .or("AT2")
      .or("AT3")
      .generate(),
    Biadjo: new AclRule("Biadjo")
      .or("AT0")
      .or("AT2")
      .generate(),
    CompanyAdmin: new AclRule("CompanyAdmin")
      .or("AT1")
      .or("AT3")
      .generate(),
    CompanyUser: new AclRule("CompanyUser")
      .or("AT1")
      .or("AT2")
      .or("AT3")
      .generate()
  }
});
