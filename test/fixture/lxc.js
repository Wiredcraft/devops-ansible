var _ = require('underscore');
var exec = require('child_process').exec;

var template = 'ubuntu';
var ipBase = '10.0.3.';
var ipStart = 10;

exports.servers = []

// Helper functions
exports.buildServer = function buildServer(name, callback) {
    exec('sudo lxc-create -t '+ template +' -n '+ name, function() {
        // define specific IP address for the new server
        var ip = ipBase +''+ ipStart++
        exports.servers.push({
            name: name,
            ip: ip
        });
        exec('echo "lxc.network.ipv4 = '+ ip +'/24" | sudo tee -a /var/lib/lxc/'+ name +'/config', function() {
            exec('sudo lxc-start -d -n '+ name, callback);
        });
    });
}

exports.destroyServer = function destroyServer(name, callback) {
    // hardcore destroy the box
    exec('sudo lxc-destroy -f -n '+ name, function() {
        // wait a short while
        setTimeout(callback, 2000);
    });
}

// Destroy all the created servers.
exports.buildServers = function buildServers(list, callback) {
    var remaining = list.length;
    _.each(list, function(name) {
        exports.buildServer(name, function() {
            if (--remaining === 0) return callback();
        });
    });
}

// Destroy all the created servers.
exports.destroyServers = function destroyServers(callback) {
    var remaining = exports.servers.length;
    _.each(exports.servers, function(server) {
        exports.destroyServer(server.name, function() {
            if (--remaining === 0) return callback();
        });
    });
}
