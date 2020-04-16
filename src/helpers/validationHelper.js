const moment = require('moment');

const timeFormat = 'HH:mm:ss';

export const currencyFormat = (nStr) => {
  nStr += '';
  let x = nStr.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  var z = 0;
  var len = String(x1).length;
  var num = parseInt(len / 2 - 1);

  while (rgx.test(x1)) {
    if (z > 0) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    } else {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
      rgx = /(\d+)(\d{2})/;
    }
    z++;
    num--;
    if (num == 0) {
      break;
    }
  }
  return x1 + x2;
};
export const getPartOfTheDay = (time = moment()) => {
  let timeCategory = '';

  if (
    time.isBetween(
      moment('00:00:00', timeFormat),
      moment('04:59:59', timeFormat),
    ) ||
    time.isSame(moment('00:00:00', timeFormat)) ||
    time.isSame(moment('04:59:59', timeFormat))
  ) {
    timeCategory = 'Morning';
  } else if (
    time.isBetween(
      moment('05:00:00', timeFormat),
      moment('11:59:59', timeFormat),
    ) ||
    time.isSame(moment('05:00:00', timeFormat)) ||
    time.isSame(moment('11:59:59', timeFormat))
  ) {
    timeCategory = 'Morning';
  } else if (
    time.isBetween(
      moment('12:00:00', timeFormat),
      moment('16:59:59', timeFormat),
    ) ||
    time.isSame(moment('12:00:00', timeFormat)) ||
    time.isSame(moment('16:59:59', timeFormat))
  ) {
    timeCategory = 'Afternoon';
  } else if (
    time.isBetween(
      moment('17:00:00', timeFormat),
      moment('23:59:59', timeFormat),
    ) ||
    time.isSame(moment('17:00:00', timeFormat)) ||
    time.isSame(moment('23:59:59', timeFormat))
  ) {
    timeCategory = 'Night';
  }

  return timeCategory;
};
