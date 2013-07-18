requirejs.config({
    "baseUrl": "/js/app",
    "paths": {
        "jquery"     : "../lib/jquery/jquery",
        "backbone"   : "../lib/backbone/backbone",
        "underscore" : "../lib/underscore/underscore"
    },
    urlArgs: "bust=" + (new Date()).getTime()
});


require(['../../../tests/js/tests'], function()
{
    QUnit.start();
});