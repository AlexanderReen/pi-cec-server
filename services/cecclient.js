var exec = require("child_process").exec;

module.exports.turnTVOn = function() {
    exec("echo \x22on 0\x22 | cec-client RPI -s -d 1", function(err, stdout, stderr) {
        console.log("Turned on TV successfully!");
        if (err !== null) {
            console.log('exec error: ' + err);
        }
    });
};

module.exports.turnTVOff = function() {
    exec("echo \x22standby 0\x22 | cec-client RPI -s -d 1", function(err, stdout, stderr) {
        console.log("Turned off TV successfully!");
        if (err !== null) {
            console.log('exec error: ' + err);
        }
    });
};
