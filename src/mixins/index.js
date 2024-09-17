import Vue from "vue";

Vue.prototype.$formatNumber = function (value, format = "0,0") {
  return numeral(value).format(format);
};
