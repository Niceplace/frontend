/*
* Require browser-sync
*/
var browserSync = require('browser-sync');

/**
* Run browser-sync with server config
*/
browserSync({
    server: "app",
    files: ["app/*.html", "app/css/*.css"]
});
