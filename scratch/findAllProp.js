var players = ["EnDerr",
"Engyn",
"Ensnare",
"Envious",
"Epic",
"Erik",
"Evaner",
"Eve",
"Evire",
"Exia",
"Ezrc",
"F91",
"FaiLo",
"Fairy",
"Fake",
"FallY",
"FanTaSy",
"Fargo",
"FeaR",
"Feast",
"Fenix",
"Fenner",
"Filthy",
"FireCake",
"FireZerg",
"Firebathero"];

var wtf = require("wtf_wikipedia");
var nodemw = require("nodemw");

var client = new nodemw({
    server: 'wiki.teamliquid.net',  // host name of MediaWiki-powered site
    path: 'starcraft2',                  // path to api.php script
    debug: false                 // is more verbose when set to true
});

var properties = [];

for (var i = 0; i < players.length; ++i) {
    var wikitext = client.getArticle(players[i], function(err, info){
        if (err) {
            console.log(err);
        }

        //console.log(info);


        var wikiJson = wtf.parse(info);
        var infobox = wikiJson.infobox;

        var props = Object.getOwnPropertyNames(infobox);

        properties.concat(props);
        console.log(JSON.stringify(props));
    });
}