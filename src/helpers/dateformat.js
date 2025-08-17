import moment from 'moment'
let dateFormat = {
  date(value) {
    // console.log(value);
    if (value == null) {
      return 0;
    } else {
      return moment(value).format('DD/MM/YYYY HH:mm:ss')
    }
  },
   
};

export default dateFormat;
