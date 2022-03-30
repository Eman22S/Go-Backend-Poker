/**
 * Check if value is truthy including even if it is 0
 * @param {any} value
 */
function number_exists(value) {
  return value || value === 0;
}
function format_currency(value, locale = undefined, style = 'currency', currency = 'USD') {
  const formatter = new Intl.NumberFormat(locale, {
    style,
    currency,
  });
  return formatter.format(value);
}

function difference_in_days(date1, date2) {
  date1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  date2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  var ms = Math.abs(date1-date2);
  return Math.floor(ms/1000/60/60/24);
}

function format_dates(date, secondDate, locale, separator = '') {
  let newDate = new Date(date);
  let formattedNewDate = newDate.toLocaleDateString(locale, {hour:'2-digit', minute: '2-digit',  hour12: false})

  if(secondDate){
    let secondNewDate = new Date(secondDate);

    let formattedSecondDate = secondNewDate.toLocaleDateString(locale, {hour:'2-digit', minute: '2-digit', hour12: false});
    let formattedSecondTime = secondNewDate.toLocaleTimeString(locale, {hour:'2-digit', minute: '2-digit',  hour12: false});

    if ( difference_in_days(newDate, secondNewDate) === 0) {
      return  `${formattedNewDate} ${separator} ${formattedSecondTime}`
    }
    else {
      return  `${formattedNewDate} ${separator} ${formattedSecondDate}`
    }
  }

  return `${formattedNewDate} ${separator}`;
}

export { number_exists, format_currency, difference_in_days, format_dates };
