var bot = require("./mediawiki.js");

module.exports = propertyFunc = {
    "id": function(input, item, token){
        //console.log("this is the id part");
        bot.setLabel(token, item, input.text, "en");

        var claimId = bot.addClaim(token, item, "P8", bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

    },
    "image": function(input, item, token){
        if(input.text == "PlayerImagePlaceholder.png"){
            return;
        }

        var claimId = bot.addClaim(token, item, "p82", bot.snakGenerator(bot.valueTypes.url, "http://wiki.teamliquid.net/starcraft2/File:"+input.text), bot.snakTypes.value);
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item,"P89", "Q14"))
    },
    //"caption": function(input, item, token){
    //
    //},
    "name": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P5", bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item,"P89", "Q14"))
    },
    "romanized_name": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P5", bot.sg(bot.vt.string, input.text), bot.snakTypes.value);
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item,"P89", "Q14"))
    },
    //"birth_date": function(input, item, token){
    //    var parts = input.text.split("|");
    //    var birthdate = parts[parts.length -2]+"-"+parts[parts.length -1]+"-"+parts[parts.length];
    //    return makeJson("P6", birthdate);
    //},
    //"country": function(input, item, token){
    //
    //},
    //"country2": function(input, item, token){
    //
    //},
    "race": function(input, item, token){
        var claimId;
        if (input.text == "T"){
            claimId = bot.addClaim(token, item, "P7", bot.snakGenerator(bot.valueTypes.item, "Q37"));
            bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
            return

        }

        if (input.text == "P"){
            claimId = bot.addClaim(token, item, "P7", bot.snakGenerator(bot.valueTypes.item, "Q39"));
            bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
            return


        }

        if (input.text == "Z"){
            claimId = bot.addClaim(token, item, "P7", bot.snakGenerator(bot.valueTypes.item, "Q38"));
            bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

        }
    },
    //"team": function(input, item, token){
    //
    //},
    //"teamlink": function(input, item, token){
    //
    //},
    //"clan": function(input, item, token){
    //
    //},
    //"sponsor": function(input, item, token){
    //
    //},
    "ids": function(input, item, token){
        var ids = input.text.split(",");
        for(var i = 0; i < ids.length; i++){
            if(ids[i].trim() == ""){
                continue;
            }
            var claimId = bot.addClaim(token, item, "P8", bot.sg(bot.vt.string, ids[i].trim()));
            bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

        }
    },
    "tlpdint": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P14", bot.sg(bot.vt.string,input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
    },
    "tlpdkr": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P29", bot.sg(bot.vt.string,input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

    },
    "tlpdhots": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P13", bot.sg(bot.vt.string,input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

    },
    "aligulac": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P57", bot.sg(bot.vt.string,input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

    },
    "site": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P65", bot.sg(bot.vt.url, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

    },
    //"tlstream": function(input, item, token){
    //
    //},
    "twitch": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P59", bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

    },
    "azubu": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P66",bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
    },
    //"stream": function(input, item, token){
    //
    //},
    //"youtube": function(input, item, token){
    //
    //},
    "twitter": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P60", bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
    },
    "facebook": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P61", bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
    },
    //"weibo": function(input, item, token){
    //
    //},
    "tencent": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P87", bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

    },
    "gplus": function(input, item, token){
        var claimId = bot.addClaim(token, item, "P68", bot.sg(bot.vt.string, input.text));
        bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));
    },
    //"tlprofile": function(input, item, token){
    //
    //},
    //"reddit": function(input, item, token){
    //
    //},
    //"fanclub": function(input, item, token){
    //
    //},
    //"playlist": function(input, item, token){
    //
    //},
    //"history": function(input, item, token){
    //
    //},
    //"retired": function(input, item, token){
    //
    //},
    "nicknames": function(input, item, token){
        var nicks = input.text.split(",");
        for(var i = 0; i < nicks.length; i++){
            if(nicks[i].trim() == ""){
                continue;
            }

            var claimId = bot.addClaim(token, item, "P69", bot.sg(bot.vt.string, nicks[i].trim()));
            bot.setReference(token, claimId, bot.referencesGen(bot.valueTypes.item, "P89", "Q14"));

        }
    }
};