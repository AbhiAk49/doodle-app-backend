const moment = require('moment');
function formatSession() {
  return {
    time: moment().format('h:mm a'),
    date: moment().format('DD/MM/YYYY'),
  };
}

module.exports = formatSession;
