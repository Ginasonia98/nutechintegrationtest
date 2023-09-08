import axios from "axios";

// let token = JSON.parse(localStorage.getItem("token_sn_admin_redux")).replaceAll(
//   '"',
//   ""
// );
// console.log(token, "hha");

export const API = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.app/",
});
