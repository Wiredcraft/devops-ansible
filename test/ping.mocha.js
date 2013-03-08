var should = require('should');
var _ = require('underscore');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

// Add lxc helper
var lxc = require('./fixture/lxc.js');

var servers = [
    'test1',
    'test2',
    'test3'
]


describe('spawn a box', function() {
    before(function(done) {
        this.timeout(100000);
        lxc.buildServers(servers, done);
    });
    after(function(done) {
        this.timeout(100000);
        lxc.destroyServers(done);
    });
    
    it('should be able to ping the '+ servers.length +' servers', function(done) {
        var remaining = lxc.servers.length;
        _.each(lxc.servers, function(server) {
            exec('ping -c 1 '+ server.ip, function(err, stdout, stderr) {
                should.not.exist(err);
                should.exist(stdout);
                should.exist(stderr);
                stderr.should.equal('');
                if (--remaining === 0) return done();
            });
        });
    });
});