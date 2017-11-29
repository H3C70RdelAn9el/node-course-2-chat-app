// unix epic: jan 1st 1970 00:00:00 am
// stored in milliseconds
// 1000 = 1 second into jan 1st 1970
// new Date().getTime()
var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());  //returns numerical number for month.  0-11 jan-dec
//
// var date = moment();   //this gives us the current getTime
// // date.add(100, 'years').subtract(9, 'months').add(200,'days');
// console.log(date.format('MMM Do, YYYY'));
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234;
var time=moment(createdAt);
console.log(time.format('h:mm a'));
