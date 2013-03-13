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
            fs.mkdirSync('./fixture/spaces');
            fs.mkdirSync('./fixture/spaces/test');
            exec('echo "[server]
'+ lxc.servers[0].ip +'
" > ./fixture/spaces/test/hosts', function(err, stdout, stderr) {
                fs.symlinkSync('../../../playbooks', './fixture/spaces/test/playbooks');
                done()
            });
        });
    });
    after(function(done) {
        this.timeout(100000);
        lxc.destroyServers(function() {
            fs.unlinkSync('./fixture/spaces/test/hosts');
            fs.unlinkSync('./fixture/spaces/test/playbooks');
            fs.rmdirSync('./fixture/spaces/test');
            fs.rmdirSync('./fixture/spaces');
            done();
        });
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
        exec('python ../../../../bindevops-playbook.py -i hosts playbooks/initServer.yml -u ubuntu -p ubuntu -e newserver='+ lxc.servers[0].ip +' -s', {
            cwd: './fixture/spaces/test'
        }, function(err, stdout, stderr) {
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
        exec('python ../../../../bindevops-playbook.py -i hosts playbooks/initServer.yml -e newserver='+ lxc.servers[0].ip +' -s', {
            cwd: './fixture/spaces/test'
        }, function(err, stdout, stderr) {
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