import axios from "axios";

var domain = "";

if (domain == "") {
  domain = localStorage.getItem("URL");
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("AccessToken");
}

export default axios.create({
  baseURL: domain
  // You can add your headers here
  // headers: {
  //     Authorization: "Bearer " + localStorage.getItem("AccessToken")
  //   }
});
