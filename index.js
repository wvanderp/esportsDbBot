var deasync = require("deasync");

var bot = require("./modules/mediawiki.js");
var propertyFunc = require("./modules/esportsbot.js");

var playerList = require("./modules/playerlist");

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

    //for (i in playerList) {
    //    var name = playerList[i];

        //
        //(function(uname) {

        //    var done;
        //
        //    var wikitext = client.getArticle(name, function (err, info) {
        //
        //        if (err) {
        //            console.log(err);
        //        }
        //
        //        var wikiJson = wtf.parse(info);
        //
        //        var infoBox = wikiJson.infobox;
        //
        //        var props = Object.getOwnPropertyNames(infoBox);
        //
        //        if (typeof infoBox.id != "undefined" && typeof infoBox.id.text != "undefined"){
        //            console.log("addding "+infoBox.id.text);
        //        }
        //
        //        var itemId = bot.newItem(token);
        //
        //        var claimId;
        //        claimId = bot.addClaim(token, itemId, "P2", bot.snakGenerator(bot.valueTypes.item, "Q40"));
        //        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
        //
        //        claimId = bot.addClaim(token, itemId, "P77", bot.snakGenerator(bot.valueTypes.string, uname));
        //        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
        //
        //        claimId = bot.addClaim(token, itemId, "P92", bot.snakGenerator(bot.valueTypes.item, "Q36"));
        //        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
        //
        //
        //        for (p in props) {
        //            var func = propertyFunc[props[p]];
        //
        //            if (typeof func != "undefined") {
        //                func(infoBox[props[p]], itemId, token);
        //            }
        //
        //            console.log(p+"/"+props.length);
        //        }
        //        done = true;
        //    });
        //
        //    while (done === undefined) {
        //        deasync.runLoopOnce();
        //    }
        //}(name))
    //}
});