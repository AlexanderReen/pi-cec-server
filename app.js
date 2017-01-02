var express = require("express"),
    PubNub = require('pubnub'),
    cecclient = require("./services/cecclient"),
    env,
    config,
    app;

var env = process.env.NODE_ENV || "production";

config = require("./config/config.js")[env];

process.env.PNKEY = config.PNkey;
process.env.PNSUB = config.PNsub;

pubnub = new PubNub({
    publishKey: process.env.PNKEY,
    subscribeKey: process.env.PNSUB
});

app = express();
app.set("port", process.env.PORT || config.port);

var server = app.listen(app.get("port"), function() {
    console.log("PiCECServer listening on port", server.address().port);

    console.log("Subscribing to TVControll");
    pubnub.subscribe({
        channels: ['TVControll']
    });

    // function publishSampleMessage() {
    //
    //     var operation = "TurnTVOff"
    //     var publishConfig = {
    //         channel : "TVControll",
    //         message : operation
    //     }
    //     pubnub.publish(publishConfig, function(status, response) {
    //         console.log(status, response);
    //     })
    // }

    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                //publishSampleMessage();
            }
        },
        message: function(payload) {

            switch (payload.message) {

                case "TurnTVOn":
                    cecclient.turnTVOn();
                    break;
                case "TurnTVOff":
                    cecclient.turnTVOff();
            }
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })
});
