var bot = require("wikibase-api");

var tofix = require("./modules/tofix.js");

bot.settings.endpoint = "http://esportsdb.net/w/api.php";
//bot.settings.endpoint = "http://localhost:8000/esdb/api.php";
bot.settings.userAgent = "Mozilla/5.0 (esportsbot/1.0.0; +http://esportsdb.net/wiki/esportsdb:Esportsbot)";

bot.login("esportsbot", "password", function (err, username) {
    if (err) {
        console.log(err);
    }

    var token = bot.getToken();

});