"use strict"

const client = require('phonegap-build-api');
const colors = require('colors');
const fs = require('fs');

exports.downloadPhonegapBuilds = function downloadPhonegapBuilds(phonegapAppId, phonegapAuthToken, androidFilename,
    iosFilename, callback) {


    client.auth({ token: phonegapAuthToken }, function (e, api) {

        if (e) {
            console.log('error:', e);
            return;
        }

        console.log("Start downloading android build...".gray)
        var androidStream = fs.createWriteStream(androidFilename);
        androidStream.on('close', function () {
            console.log("Finished downloading android build...".green)
            var iosStream = fs.createWriteStream(iosFilename);
            iosStream.on('close', function () {
                console.log("Finished downloading ios build...".green)
                if (callback) {
                    console.log("Start running given callback...".gray)
                    callback();
                }
            });
            console.log("Start downloading ios build...".gray)
            api.get('/apps/' + phonegapAppId + '/ios').pipe(iosStream);

        });
        api.get('/apps/' + phonegapAppId + '/android').pipe(androidStream);

    });



}




