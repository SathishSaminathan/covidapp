const moment = require('moment');

const timeFormat = 'HH:mm:ss';
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
