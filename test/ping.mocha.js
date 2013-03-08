var should = require('should');
var _ = require('underscore');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var serversPath = path.join(__dirname, 'fixture', 'servers');
var templatesPath = path.join(__dirname, 'fixture', 'templates');

// lxc default settings - only work in linux! no macosx
var servers = [];
var lxcTemplate = 'ubuntu';
var lxcIpBase = '10.0.3.';
var lxcIpStart = 4;



describe('spawn a box', function() {
    before(function(done) {
        this.timeout(100000);
        buildServer('test', function() {
            buildServer('test2', done);
        });
    });
    after(function(done) {
        this.timeout(100000);
        destroyServers(done);
    });
    
    it('should be able to ping both servers', function(done) {
        var remaining = servers.length;
        _.each(servers, function(server) {
            exec('ping -c 1 '+ server.ip, function(err, stdout, stderr) {
                should.not.exist(err);
                should.not.exist(stderr);
                should.exist(stdout);
                console.log(stdout);
                if (--remaining === 0) return done();
            });
        });
    });
});


// Helper functions
function buildServer(name, callback) {
    exec('sudo lxc-create -t '+ lxcTemplate +' -n '+ name, function() {
        // define specific IP address for the new server
        var ip = lxcIpBase +''+ lxcIpStart++
        servers.push({
            name: name,
            ip: ip
        });
        exec('sudo echo "lxc.network.ipv4 = '+ ip +'/24" >> /var/lib/lxc/'+ name +'/config', function() {
            exec('sudo lxc-start -d -n '+ name, callback);
        });
    });
}

function destroyServer(name, callback) {
    exec('sudo lxc-shutdown -n '+ name, function() {
        exec('sudo lxc-destroy -n '+ name, callback);
    });
}

// Destroy all the created servers.
function destroyServers(callback) {
    var remaining = servers.length;
    _.each(servers, function(server) {
        destroyServer(server.name, function() {
            if (--remaining === 0) return callback();
        });
    });
}