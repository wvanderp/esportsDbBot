var request = require('request');
var querystring = require("querystring");
var deasync = require("deasync");
var moment = require('moment');

var version = "4";
var homepage = "esportsdb.net";

var settings = {
    endpoint: "http://en.wikipedia.org:80/w/api.php",
    userAgent: "MediaWiki/" + version + "; Node/" + process.version + "; <" + homepage + ">",
    byeline: "(using the MediaWiki module for Node.js)"
};

var get = function (args, callback) {
    args.format = "json"; // we will always expect JSON

    var options = {
        uri: settings.endpoint,
        qs: args,
        form: args,
        jar: true,
        headers: {
            "User-Agent": settings.userAgent
        }
    };

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("get: "+response.request.uri.href);

            processResponse(body, callback);
        } else {
            callback(new Error(response.statusCode), null);
        }
    });
};

var post = function (args, body, callback) {
    args.format = "json"; // we will always expect JSON


    var options = {
        uri: settings.endpoint,
        qs: args,
        form: args,
        jar: true,
        headers: {
            "User-Agent": settings.userAgent,
            'content-type': 'application/x-www-form-urlencoded'
        }
    };

    if (body != null) {
        body = querystring.stringify(body);
        var bodyLength = body.length;
        options.body = body;
        options.headers["Content-Length"] = bodyLength;
    }

    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("post: "+response.request.uri.href);
            //console.log(JSON.stringify(response));
            processResponse(body, callback);
        } else {
            callback("error: " + response.statusCode, null);
        }
    });
};


// process an API response
function processResponse(body, callback) {
    var data = {};
    try {
        data = JSON.parse(body);
    } catch (err) {
        callback(err, null);
        return;
    }

    callback(null, data);
}


/** PRE-BAKED FUNCTIONS **/

/**
 * Log in to the Wiki
 * @param username the user to log in as
 * @param password the password to use
 * @param callback
 */
var login = function (username, password, callback) {
    post({
            action: "login",
            lgname: username,
            lgpassword: password
        },
        null,
        function (err, data) {
            if (err) {
                callback(err, null);
            }
            switch (data.login.result) {
                case "Success":
                    callback(null, data.login.lgusername);
                    break;
                case "NeedToken":
                    post({
                            action: "login",
                            lgname: username,
                            lgpassword: password,
                            lgtoken: data.login.token
                        },
                        null,
                        function (err, data) {
                            if (err) {
                                callback(err, null);
                            }
                            if (data.login.result == "Success") {
                                callback(null, data.login.lgusername);
                            } else {
                                callback(data.login.result, null);
                            }
                        }.bind(this));
                    break;
                default:
                    callback(new Error(data.login.result), null);
                    break;
            }
        }.bind(this)
    )
};

/**
 * Logs out of the Wiki
 * @param callback
 */
var logout = function (callback) {
    // post to MAKE SURE it always happens
    post({action: "logout"}, callback);
};

/**
 * Requests the current user name
 */
var name = function (callback) {
    userinfo(function (err, data) {
            if (err) {
                callback(err, null);
            }
            callback(null, data.name);
        }.bind(this)
    )
};

// a duplicate reference for tradition's sake
var whoami = name;

/**
 * Requests the current userinfo
 */
var userinfo = function (callback) {
    get({action: "query", meta: "userinfo"}, function (err, data) {
        if (err) {
            callback(err, null);
        }
        callback(null, data.query.userinfo);
    }.bind(this));
};

var getToken = function () {
    var token;
    get({"action": "query", "meta": "tokens"}, function (err, resp) {
        if (err) {
            throw err;
        }

        token = resp.query.tokens.csrftoken;
    }.bind(this));

    while (token === undefined) {
        deasync.runLoopOnce();
    }

    return token;
};


var newItem = function (token) {
    var params = {
        "action": "wbeditentity",
        "new": "item",
        "data": "{}",
        "format": "json",
        "token": token
    };

    var id;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }

        id = resp.entity.id
    }.bind(this));

    while (id === undefined) {
        deasync.runLoopOnce();
    }

    return id;
};

var setLabel = function (token, id, value, language) {
    if (typeof language == "undefined") {
        language = "en"
    }

    var params = {
        "action": "wbsetlabel",
        "id": id,
        "language": language,
        "value": value,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }


        done = true;
    }.bind(this));

    while (done === undefined) {
        deasync.runLoopOnce();
    }
};


var setDescription = function (token, id, value, language) {
    if (typeof language == "undefined") {
        language = "en"
    }

    var params = {
        "action": "wbsetdescription",
        "id": id,
        "language": language,
        "value": value,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }


        done = true
    }.bind(this));

    while (done === undefined) {
        deasync.runLoopOnce();
    }
};


var addAliases = function (token, id, value, language) {
    if (typeof language == "undefined") {
        language = "en"
    }

    var params = {
        "action": "wbsetaliases",
        "language": language,
        "id": id,
        "set": value,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }


        done = true;
    }.bind(this));

    while (id === undefined) {
        deasync.runLoopOnce();
    }
};


var getClaims = function (id) {
    var params = {
        "action": "wbgetclaims",
        "entity": id
    };

    var claims;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }

        claims = resp.claims
    }.bind(this));

    while (claims === undefined) {
        deasync.runLoopOnce();
    }

    return claims;
};


var addClaim = function (token, entity, property, value, snaktype) {
    if (typeof snaktype == "undefined") {
        snaktype = "value"
    }


    var params = {
        "action": "wbcreateclaim",
        "entity": entity,
        "property": property,
        "snaktype": snaktype,
        "token": token
    };

    if (snaktype != snaktype.novalue) {
        params["value"] = value
    }

    var claimId;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            console.log(token, entity, property, value);
            throw resp.error.info;
        }

        claimId = resp.claim.id

    }.bind(this));

    while (claimId === undefined) {
        deasync.runLoopOnce();
    }

    return claimId;
};


var removeClaim = function (token, entity, claimId) {
    entity = entity.toUpperCase();

    var params = {
        "action": "wbremoveclaims",
        "claim": entity + "$" + claimId,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }


        done = true;
    }.bind(this));

    while (done === undefined) {
        deasync.runLoopOnce();
    }
};


var setQualifier = function (token, claimId, property, value, snaktype) {
    if (typeof snaktype == "undefined") {
        snaktype = "value"
    }

    entity = entity.toUpperCase();

    var params = {
        "action": "wbsetqualifier",
        "claim": claimId,
        "property": property,
        "value": value,
        "snaktype": snaktype,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            console.log(token, claimId, property, value, snaktype);
            throw resp.error.info;
        }


        done = true;
    }.bind(this));

    while (done === undefined) {
        deasync.runLoopOnce();
    }
};


var removeQualifiers = function (token, claimId, qualifierId) {
    entity = entity.toUpperCase();

    var params = {
        "action": "wbremovequalifiers",
        "claim": claimId,
        "qualifiers": qualifierId,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }


        done = true;
    }.bind(this));

    while (done === undefined) {
        deasync.runLoopOnce();
    }
};


var setReference = function (token, claimId, snaks) {
    claimId = claimId.toUpperCase();

    var params = {
        "action": "wbsetreference",
        "statement": claimId,
        "snaks": snaks,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            console.log(token, claimId, snaks);
            throw resp.error.info;
        }


        done = true
    }.bind(this));

    while (done === undefined) {
        deasync.runLoopOnce();
    }
};


var removeReferences = function (token, claimId, referenceId) {
    id = id.toUpperCase();

    var params = {
        "action": "wbremovereferences",
        "statement": claimId,
        "references": referenceId,
        "token": token
    };

    var done;
    get(params, function (err, resp) {
        if (err) {
            throw err;
        }

        if (typeof resp.error != "undefined") {
            throw resp.error.info;
        }


        done = true
    }.bind(this));

    while (done === undefined) {
        deasync.runLoopOnce();
    }
};

var snakGenerator = function (type, value) {

    switch (type) {
        case "string":
            value = value + '';
            value = value.replace(/"/g, '\\"');
            return "\"" + value + "\"";
            break;
        case "item":
            value = value.toLowerCase();
            value = value.replace("q", "");
            return '{"entity-type":"item","numeric-id":' + value + '}';
            break;
        case "coordinate":
            //Statements executed when the result of expression matches valueN
            break;
        case "time":
            //TODO: date time doesn't work

            if (isNaN(date)) {
                throw "not a good date"
            }


            return '{ ' +
                '"time": "+' + date.toISOString() + '",' +
                    //        '"time":"+00000002010-01-02T00:00:00Z",'+
                '"timezone":0,' +
                '"before":0,' +
                '"after":0,' +
                '"precision":11,' +
                '"calendarmodel":"http://www.wikidata.org/entity/Q1985727"' +
                '}';
            break;
        case "quantity":
            return "[" + value + "]";
            break;
        case "url":
            if(value.indexOf("http://") == -1 && value.indexOf("https://") == -1){
                value = "http://"+value
            }
            return "\"" + encodeURI(value) + "\"";
            break;
        default:
            throw "unknown snak type";
            break;
    }
};

var referencesGen = function (type, property, value) {
    switch (type) {
        case "string":
            return "\"" + value + "\"";
            break;
        case "item":
            property = property.toUpperCase();

            var bigval = value.toUpperCase();
            value = value.toLowerCase().replace("q", "");

            return JSON.stringify({
                property: [
                    {
                        "snaktype": "value",
                        "property": property,
                        "datavalue": {
                            "value": {
                                "entity-type": "item",
                                "numeric-id": value,
                                "id": bigval
                            },
                            "type": "wikibase-entityid"
                        },
                        "datatype": "wikibase-item"
                    }
                ]
            });

            break;
        case "coordinate":
            //TODO:
            break;
        case "time":
            return {
                property: [
                    {
                        "mainsnak": {
                            "snaktype": "value",
                            "property": property,
                            "datavalue": {
                                "value": {
                                    "time": value,
                                    "timezone": 0,
                                    "before": 0,
                                    "after": 0,
                                    "precision": 9,
                                    "calendarmodel": "http://www.wikidata.org/entity/Q1985727"
                                },
                                "type": "time"
                            },
                            "datatype": "time"
                        },
                        "type": "statement",
                        "id": "Q32$6753582b-4910-9c03-7375-be8b91403391",
                        "rank": "normal"
                    }
                ]
            };
            break;
        case "quantity":
            return {
                property: [
                    {
                        "mainsnak": {
                            "snaktype": "value",
                            "property": property,
                            "datavalue": {
                                "value": value,
                                "type": "string"
                            },
                            "datatype": "string"
                        },
                        "type": "statement",
                        "id": "Q32$74379D79-2B96-464B-8326-A4C4693983A5",
                        "rank": "normal"
                    }
                ]
            };
            break;
        default:
            throw "unknown snak type";
            break;
    }
};

var snakTypes = {
    "value": "value",
    "novalue": "novalue",
    "somevalue": "somevalue"
};

var valueTypes = {
    "string": "string",
    "item": "item",
    "coordinate": "coordinate",
    "time": "time",
    "date": "time",
    "quantity": "quantity",
    "url": "url"
};

module.exports = {
    version: version,
    settings: settings,
    get: get,
    post: post,
    login: login,
    logout: logout,
    name: name,
    whoami: whoami,
    userinfo: userinfo,
    getToken: getToken,

    getClaims: getClaims,
    newItem: newItem,
    setLabel: setLabel,
    setDescription: setDescription,
    addAliases: addAliases,
    addClaim: addClaim,
    removeClaim: removeClaim,
    setQualifier: setQualifier,
    removeQualifiers: removeQualifiers,
    setReference: setReference,
    removeReferences: removeReferences,

    referencesGen: referencesGen,
    snakTypes: snakTypes,
    snakGenerator: snakGenerator,
    valueTypes: valueTypes,

    vt: valueTypes,
    sg: snakGenerator,
    st: snakTypes,
    rg: referencesGen
};
