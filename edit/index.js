var bot = require("wikibase-api");

var tofix = require("./tofix.js");

bot.settings.endpoint = "http://esportsdb.net/w/api.php";
//bot.settings.endpoint = "http://localhost:8000/esdb/api.php";
bot.settings.userAgent = "Mozilla/5.0 (esportsbot/1.0.0; +http://esportsdb.net/wiki/esportsdb:Esportsbot)";

bot.login("esportsbot", "password", function (err, username) {
    if (err) {
        console.log(err);
    }

    var token = bot.getToken();
    var length = tofix.length-1;

    for(var i in tofix){
        var to = tofix[i];

        var prev = to.value.id;

        var guid = to["wbid"].split("$")[1];

        bot.removeClaim(token,to["entity_id"],guid);

        bot.addClaim(token, to["entity_id"], "P7", bot.snakGenerator(bot.st.item, prev));
        console.log(to["wbid"]);
        console.log(i+"/"+length);
    }

});