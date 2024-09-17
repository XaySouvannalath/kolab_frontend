import numeral from "numeral";

let formatNumber = {
  format(value) {
    // console.log(value);
    if (value == null) {
      return 0;
    } else {
      return numeral(value).format("0,0");
    }
  },
  formatFollower(num) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }
};

export default formatNumber;
