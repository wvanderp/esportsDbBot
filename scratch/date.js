var bot = require("./../modules/mediawiki.js");

bot.settings.endpoint = "http://localhost:8000/esdb/api.php";
bot.settings.userAgent = "Mozilla/5.0 (esportsbot/1.0.0; +http://esportsdb.net/wiki/esportsdb:Esportsbot)";

bot.login("esportsbot", "password", function (err, username) {
    if (err) {
        console.log(err);
    }

    var token = bot.getToken();

    //console.log(JSON.stringify(bot.getClaims("q32")));
console.log(bot.sg(bot.vt.date, "November 10, 1995"));
    //bot.addClaim(token, "q32", "p6", bot.sg(bot.vt.date, "November 10, 1995"))
});