requirejs.config({
    "baseUrl": "/js/app",
    "paths": {
        "jquery"     : "../lib/jquery/jquery",
        "backbone"   : "../lib/backbone/backbone",
        "underscore" : "../lib/underscore/underscore",
        "backbone-localstorage" : "../lib/backbone-localstorage/backbone.localStorage"
    },
    urlArgs: "bust=" + (new Date()).getTime()
});


require(['../../../tests/js/tests'], function()
{
    QUnit.start();
});