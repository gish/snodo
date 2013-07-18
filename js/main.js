requirejs.config({
    "baseUrl": "js/app",
    "paths": {
        "jquery"     : "../lib/jquery/jquery",
        "backbone"   : "../lib/backbone/backbone",
        "underscore" : "../lib/underscore/underscore"
    },
    urlArgs: "bust=" + (new Date()).getTime()
});

// Load the main app module to start the app
requirejs(["app"]);