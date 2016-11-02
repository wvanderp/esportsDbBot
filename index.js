var deasync = require("deasync");

var bot = require("./modules/mediawiki.js");
var propertyFunc = require("./modules/esportsbot.js");

var wtf = require("wtf_wikipedia");
var nodemw = require("nodemw");

var client = new nodemw({
    server: 'wiki.teamliquid.net',  // host name of MediaWiki-powered site
    path: 'starcraft2',                  // path to api.php script
    debug: false,               // is more verbose when set to true
    "userAgent": "Mozilla/5.0 (esportsbot/1.0.0; +http://esportsdb.net/wiki/esportsdb:Esportsbot)"
});

bot.settings.endpoint = "http://esportsdb.net/w/api.php";
bot.settings.userAgent = "Mozilla/5.0 (esportsbot/1.0.0; +http://esportsdb.net/wiki/esportsdb:Esportsbot)";

bot.login("esportsbot", "password", function (err, username) {
    if (err) {
        console.log(err);
    }

    //var token = bot.getToken();

    console.log(bot.getClaims("q32"));

});