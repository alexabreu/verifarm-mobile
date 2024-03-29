#!/usr/bin/env node

console.log("Copying icons and splash screens...");

//
// This hook copies various resource files from our version control system directories into the appropriate platform specific location
//


// configure all the files to copy.  Key of object is the source file, value is the destination location.  It's fine to put all platforms' icons and splash screen files here, even if we don't build for all platforms on each developer's box.
var filestocopy = [{
    "config/android/res/drawable/icon.png": "platforms/android/res/drawable/icon.png"
}, {
    "config/android/res/drawable-hdpi/icon.png": "platforms/android/res/drawable-hdpi/icon.png"
}, {
    "config/android/res/drawable-ldpi/icon.png": "platforms/android/res/drawable-ldpi/icon.png"
}, {
    "config/android/res/drawable-mdpi/icon.png": "platforms/android/res/drawable-mdpi/icon.png"
}, {
    "config/android/res/drawable-xhdpi/icon.png": "platforms/android/res/drawable-xhdpi/icon.png"
}, {
    "config/android/res/drawable/splash.png": "platforms/android/res/drawable/splash.png"
}, {
    "config/android/res/drawable-hdpi/splash.png": "platforms/android/res/drawable-hdpi/splash.png"
}, {
    "config/android/res/drawable-ldpi/splash.png": "platforms/android/res/drawable-ldpi/splash.png"
}, {
    "config/android/res/drawable-mdpi/splash.png": "platforms/android/res/drawable-mdpi/splash.png"
}, {
    "config/android/res/drawable-xhdpi/splash.png": "platforms/android/res/drawable-xhdpi/splash.png"
}, {
    "www/res/icon/ios/icon-72.png": "platforms/ios/VeriFarm/Resources/icons/icon-72.png"
}, {
    "www/res/icon/ios/icon-57.png": "platforms/ios/VeriFarm/Resources/icons/icon.png"
}, {
    "www/res/icon/ios/icon-57-2x.png": "platforms/ios/VeriFarm/Resources/icons/icon@2x.png"
}, {
    "www/res/icon/ios/icon-60.png": "platforms/ios/VeriFarm/Resources/icons/icon-60.png"
}, {
    "www/res/icon/ios/icon-60-2x.png": "platforms/ios/VeriFarm/Resources/icons/icon-60@2x.png"
}, {
    "www/res/icon/ios/icon-72-2x.png": "platforms/ios/VeriFarm/Resources/icons/icon-72@2x.png"
}, {
    "www/res/screen/ios/screen-iphone-portrait-2x.png": "platforms/ios/VeriFarm/Resources/splash/Default@2x~iphone.png"
}, {
    "www/res/screen/ios/screen-iphone-portrait-568h-2x.png": "platforms/ios/VeriFarm/Resources/splash/Default-568h@2x~iphone.png"
}, {
    "www/res/screen/ios/screen-iphone-portrait.png": "platforms/ios/VeriFarm/Resources/splash/Default~iphone.png"
}, {
    "www/res/screen/ios/Default-Portrait~ipad.png": "platforms/ios/VeriFarm/Resources/splash/Default-Portrait~ipad.png"
}, {
    "www/res/screen/ios/Default-Portrait@2x~ipad.png": "platforms/ios/VeriFarm/Resources/splash/Default-Portrait@2x~ipad.png"
}, ];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
        }
    });
});
