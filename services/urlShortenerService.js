"use strict";
const Datastore = require('nedb');
const schedule = require('node-schedule');

const urlDB = new Datastore({filename: '../data/urlKV.db', autoload: true});
const expDB = new Datastore({filename: '../data/expKV.db', autoload: true});

urlDB.persistence.setAutocompactionInterval(60000);
expDB.persistence.setAutocompactionInterval(60000);



function ShortUrl(reservation) {
    let date = new Date(); // Now
    date.setDate(date.getDate() + 30);
    this.urlDBObject = {
        key: '/' + reservation.alias,
        value: reservation.originalUrl
    };
    this.expDBObject = {
        key: '/' + reservation.alias,
        value: date
    }
}

module.exports.insertURL = function (reservation, callback) {
    let shortUrl = new ShortUrl(reservation);
    urlDB.findOne({key:shortUrl.urlDBObject.key},{},function (err, lookup) {
        if(lookup == null){
        urlDB.insert(shortUrl.urlDBObject, function (err, url) {
            expDB.insert(shortUrl.expDBObject, function (err, exp) {
                callback(err, url, exp);
            });
        });
        } else {
            callback("Short URL is already Taken! Please try a new one", null, null);
        }
    });

};

module.exports.find = function (url, callback) {
    urlDB.findOne({key:url}, {}, function (err, lookup) {
        callback(lookup);
    })
};

schedule.scheduleJob('00 00 03 * * 1-7', function(){
    expDB.find({value: {$lt: new Date()}}, {}, function (err, docs) {
        for(let i = 0; i < docs.length; i++){
            urlDB.remove({key: docs[i].key});
            expDB.remove({key: docs[i].key});
        }
    })
});
