var should = require('should');
var _ = require('underscore');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

// Add lxc helper
var lxc = require('./fixture/lxc.js');

var servers = [
    'test1'
]


describe('spawn a box', function() {
    before(function(done) {
        this.timeout(100000);
        lxc.buildServers(servers, function() {
            // TODO - fill the fake hosts in test_space
            done()
        });
    });
    after(function(done) {
        this.timeout(100000);
        lxc.destroyServers(done);
    });
    
    it('should be able to ping the server', function(done) {
        exec('ping -c 1 '+ lxc.servers[0].ip, function(err, stdout, stderr) {
            should.not.exist(err);
            should.exist(stdout);
            should.exist(stderr);
            stderr.should.equal('');
            done();
        });
    });
    it('should be able to init the server', function(done) {
        exec('echo "ubuntu" | ansible -i fixture/test_space/hosts ../common/tasks/users.yml -u ubuntu -p -k -s', function(err, stdout, stderr) {
            console.log(err);
            console.log(stderr);
            console.log(stdout);
            should.not.exist(err);
            should.exist(stdout);
            should.exist(stderr);
            stderr.should.equal('');
            done()
        });
    });
    it('should be able to access the server with the regular user', function(done) {
        exec('ansible -i fixture/test_space/hosts ../common/tasks/users.yml -s', function(err, stdout, stderr) {
            console.log(err);
            console.log(stderr);
            console.log(stdout);
            
            should.not.exist(err);
            should.exist(stdout);
            should.exist(stderr);
            stderr.should.equal('');
            done()
        });
    });
    
});