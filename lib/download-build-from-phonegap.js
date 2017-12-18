"use strict"

const pgBuild = require('phonegap-build-api');
const colors = require('colors');
const fs = require('fs');

exports.downloadPhonegapBuilds = function downloadPhonegapBuilds(phonegapAppId, phonegapAuthToken, callback) {


    client.auth({ token: phonegapAuthToken }, function (e, api) {

        if (e) {
            console.log('error:', e);
            return;
        }

        console.log("Start downloading android build...".gray)
        var androidStream = fs.createWriteStream('phonegap_build/android_onyva.apk');
        androidStream.on('close', function () {
            console.log("Finished downloading android build...".green)
            var iosStream = fs.createWriteStream('phonegap_build/ios_onyva.ipa');
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




