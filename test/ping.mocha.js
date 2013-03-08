var should = require('should');
var _ = require('underscore');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

// Add lxc helper
var lxc = require('./fixture/lxc.js');

describe('spawn a box', function() {
    before(function(done) {
        this.timeout(100000);
        lxc.buildServer('test', function() {
            lxc.buildServer('test2', done);
        });
    });
    after(function(done) {
        this.timeout(100000);
        lxc.destroyServers(done);
    });
    
    it('should be able to ping both servers', function(done) {
        var remaining = lxc.servers.length;
        _.each(lxc.servers, function(server) {
            exec('ping -c 1 '+ server.ip, function(err, stdout, stderr) {
                if (--remaining === 0) return done();
            });
        });
    });
});