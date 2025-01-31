import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";
import { createApp } from "vue";

// Styles
import formatNumber from "@/helpers/number";
import ranking from "@/helpers/reviewRanking";
import "@core/scss/template/index.scss";
import "@styles/styles.scss";
import axios from "axios";
import VueViewer from "v-viewer";
import "viewerjs/dist/viewer.css";

import { VueSpinners } from "@saeris/vue-spinners";

import { createStore } from "vuex";

import VueClipboard from "vue-clipboard2";

var server_url = import.meta.env.VITE_API;

// Create a new store instance.
const store = createStore({
  state() {
    return {
      isLoading: false,
      isLoggedIn: false,
      token: null,
    };
  },
  mutations: {
    el(state) {
      state.isLoading = true;
    },
    dl(state) {
      state.isLoading = false;
    },
  },
});

// Install the store instance as a plugin

// Create vue app
const app = createApp(App);

const axios_ = axios.create({
  baseURL: server_url,
});

axios_.interceptors.request.use(
  function (req) {
    req.headers["Content-Type"] = "application/json";
    req.headers.Saiyavong = "mitthasone";
    req.headers["Authorization"] =
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdXBpdGVyIiwiaWQiOjIsImV4cCI6MTcyNjA5NDE3NH0.5nFbe8APvctV8aLkFuuzS_NQzIU3TaHgRtml0UJJbp0";
    console.log(req);

    return req;
  },
  function (err) {
    console.log(err);
  }
);

axios_.interceptors.response.use(
  function (response) {
    //console.log(response)

    console.log(response);

    return response;
  },
  function (error) {
    console.log(error);
    let err = error.toJSON();

    let logs = `method: ${err.config.method}, url: ${err.config.baseURL}${err.config.url}`;
    if (err.config.method == "get") {
      err.msg =
        err.config.method +
        ": " +
        err.config.url
          .split("/")
          [err.config.url.split("/").length - 1].split("?")[0];
    } else {
      err.msg =
        err.config.method +
        ": " +
        err.config.url.split("/")[err.config.url.split("/").length - 1];
    }

    return Promise.reject(err);
  }
);
app.use(VueViewer);
app.use(VueSpinners);

app.use(VueClipboard);

app.use(store);

// Register plugins
registerPlugins(app);

app.config.globalProperties.$f = formatNumber;
app.config.globalProperties.$formatNumber = formatNumber;
app.config.globalProperties.$r = ranking;
app.config.globalProperties.$store = store;

app.config.globalProperties.$axios = axios_;

// app.config.globalProperties.$file = "http://localhost:8000/files?file_name=";

app.config.globalProperties.$server_url = server_url;
app.config.globalProperties.$file = server_url + "/files?file_name=";

// app.$axios = axios;
// Vue.prototype.$http = axios;

// Mount vue app
app.mount("#app");
