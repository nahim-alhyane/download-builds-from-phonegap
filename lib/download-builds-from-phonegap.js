"use strict"

const client = require('phonegap-build-api');
const colors = require('colors');
const fs = require('fs');

exports.downloadPhonegapBuilds = function downloadPhonegapBuilds(phonegapAppId, phonegapAuthToken, androidFilename,
    iosFilename, callback) {

    console.log('1');
    console.log(callback);
    client.auth({ token: phonegapAuthToken }, (e, api) => {

        console.log('2');
        console.log(callback);
        if (e) {
            console.log('error:', e);
            return;
        }

        console.log("Start downloading android build...".gray)
        var androidStream = fs.createWriteStream(androidFilename);
        androidStream.on('close', () => {

            console.log("Finished downloading android build...".green)
            console.log('3');
            console.log(callback);
            var iosStream = fs.createWriteStream(iosFilename);
            iosStream.on('close', () => {
                console.log('4');
                console.log(callback);
                console.log("Finished downloading ios build...".green)
                if (callback !== null && callback !== undefined) {
                    console.log("Start running given callback...".gray)
                }
            });
            console.log("Start downloading ios build...".gray)
            console.log(callback);
            api.get('/apps/' + phonegapAppId + '/ios').pipe(iosStream);

        });
        api.get('/apps/' + phonegapAppId + '/android').pipe(androidStream);

    });



}




