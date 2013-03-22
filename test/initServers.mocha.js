var should = require('should');
var _ = require('underscore');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

// Add lxc helper
var lxc = require('./app/lib/lxc.js');

var servers = [
    'test1'
]

describe('spawn a box and initialize it', function() {
    before(function(done) {
        this.timeout(200000);
        lxc.buildServers(servers, function() {
            fs.mkdirSync(__dirname +'/fixture/spaces');
            fs.mkdirSync(__dirname +'/fixture/spaces/test');
            exec('printf "[server]\n'+ lxc.servers[0].ip +'" > ./fixture/spaces/test/hosts', {
                cwd: __dirname
            }, function(err, stdout, stderr) {
                fs.symlinkSync('../../../../playbooks', __dirname +'/fixture/spaces/test/playbooks');
                done()
            });
        });
    });
    after(function(done) {
        this.timeout(100000);
        lxc.destroyServers(function() {
            fs.unlinkSync(__dirname +'/fixture/spaces/test/hosts');
            fs.unlinkSync(__dirname +'/fixture/spaces/test/playbooks');
            fs.rmdirSync(__dirname +'/fixture/spaces/test');
            fs.rmdirSync(__dirname +'/fixture/spaces');
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

    it('should be able to init the server with the default ubuntu user', function(done) {
        exec('python ../../../../bin/devops-playbook.py -i hosts playbooks/initServer.yml -u ubuntu -p ubuntu -e newserver='+ lxc.servers[0].ip +' -s', {
            cwd: __dirname +'/fixture/spaces/test'
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
    
    it('should be able to access the server with the regular devops user', function(done) {
        exec('python ../../../../bin/devops-playbook.py -i hosts playbooks/initServer.yml -e newserver='+ lxc.servers[0].ip +' -s', {
            cwd: __dirname +'/fixture/spaces/test'
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