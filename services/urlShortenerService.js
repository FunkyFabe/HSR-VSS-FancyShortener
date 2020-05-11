"use strict";
const redis = require("redis");

const client = redis.createClient();

function ShortUrl(reservation) {
  let date = new Date(); // Now
  date.setDate(date.getDate() + 30);
  this.urlDBObject = {
    key: '/' + reservation.alias,
    value: reservation.originalUrl
  };
  this.expDBObject = {
    key: 'ex_' + reservation.alias,
    value: date.toLocaleDateString()
  }
}

module.exports.insertURL = function (reservation, callback) {
  let shortUrl = new ShortUrl(reservation);
  client.get(shortUrl.urlDBObject.key, function (err, res) {
    if (res === null) {
      client.set(shortUrl.urlDBObject.key, shortUrl.urlDBObject.value, function (err, res) {
        if (err) {
          callback(err, null, null);
        }
        client.set(shortUrl.expDBObject.key, shortUrl.expDBObject.value, function (err, res) {
          callback(err, shortUrl.urlDBObject, shortUrl.expDBObject);
        });
      });
    } else {
      callback("Short URL is already Taken! Please try a new one", null, null);
    }
  });
};

module.exports.find = function (url, callback) {
  client.get(url, function (err, res) {
    callback(res);
  });
};


// TODO: install node-schedule and schedule job for expiration.

/*
const schedule = require('node-schedule');
schedule.scheduleJob('00 00 03 * * 1-7', function(){
    expDB.find({value: {$lt: new Date()}}, {}, function (err, docs) {
        for(let i = 0; i < docs.length; i++){
            urlDB.remove({key: docs[i].key});
            expDB.remove({key: docs[i].key});
        }
    })
});
*/




