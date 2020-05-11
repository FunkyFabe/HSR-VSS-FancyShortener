'use strict';

const notificationService = require(__dirname + '/../services/urlShortenerService');
const config = require(__dirname + '/../config/config.json');

module.exports.index = function (req, res) {
    res.redirect(`/${config.prefix}/index`);
};

module.exports.lookupShortUrl = function (req, res) {
    notificationService.find(req.path, function (lookup) {
        if (lookup) {
            res.redirect(lookup.value);
        } else {
            res.render('pageNotFound', {title: "Page Not Found", "config": config});
        }
    })
};