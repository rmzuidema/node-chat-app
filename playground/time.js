// Jan 1st 1970 00:00:00 am
// this is time 0

// 1000 is one second in the future from jan 1st 1970

var moment = require('moment');

var dateOld = new Date();
console.log("Date ", dateOld);

var date = new moment();
console.log("Date ", date.format('MMMM Do YYYY'));
console.log("Time ", date.format('h:mm a'));


