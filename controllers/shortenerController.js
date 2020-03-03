"use strict";

const notificationService = require(__dirname + '/../services/urlShortenerService');
const config = require(__dirname + '/../config/config.json');

module.exports.index = function (req, res) {
    res.render('index', {title: "Fancy URL Shortener", "config": config});
};

module.exports.registerUrl = function (req, res) {
    notificationService.insertURL(req.body, function (err, url, exp) {
        if (err) {
            res.render('index', {
                title: "Fancy URL Shortener",
                "config": config,
                "errMsg": err
            });
        } else {
            res.render('confirm', {
                title: "Fancy URL Shortener",
                "config": config,
                "url": url,
                "exp": new Date(exp.value).toLocaleDateString()
            });
        }
    });
};