'use strict';

const notificationService = require(__dirname + '/../services/urlShortenerService');

module.exports.index = function (req, res) {
    res.redirect('/fs/index');
};

module.exports.lookupShortUrl = function (req, res) {
    notificationService.find(req.path, function (lookup) {
        res.redirect(lookup.value);
    })
};