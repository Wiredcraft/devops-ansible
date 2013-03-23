var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var _ = require('underscore');

var root = path.resolve(__dirname, 'files');
var devops_py = path.resolve(__dirname, '../../bin/inventory/devops.py');
var devops_playbook_py = path.resolve(__dirname, '../../bin/devops-playbook.py');
var playbooksPath = path.resolve(__dirname, '../../playbooks');
var lxc = require('./lib/lxc');

var config = {
    'ssh': {
        'user': 'devops'
    }
}

// Middleware
app.use(express.bodyParser());

app.post('/login', function(req, res) {
    res.send(200)
})

app.get('/ansible', function(req, res, next){
    var space = req.query.space;
    fs.readFile(path.resolve(root, 'space_'+ space +'.json'), function(err, data) {
        if (err) return next(404, err);
        res.json(JSON.parse(data));
    });
});

app.get('/ansible/:id', function(req, res, next){
    fs.readFile(path.resolve(root, 'server_'+ req.params.id +'.json'), function(err, data) {
        if (err) return next(404, err);
        res.json(JSON.parse(data));
    });
});


app.post('/list', function(req, res, next) {
    var space = req.body.space;
    if (!space) return next(new Error('missing space'));

    var list = spawn('python', [
        devops_py,
        '--list'
    ], {
        env: _.extend(process.env, { ANSIBLE_DEVOPS_SPACE: space })
    });
    
    var output = { stderr: '', stdout: ''}
    list.stderr.on('data', function(data) { output.stderr += data.toString(); });
    list.stdout.on('data', function(data) { output.stdout += data.toString(); });
    list.on('exit', function(code) {
        output.code = code;
        res.json(output);
    });
    
});

app.post('/host/:id', function(req, res, next) {
    var space = req.body.space;
    var id = req.params.id;
    
    if (!space) return next(new Error('missing space'));
    var host = spawn('python', [
        devops_py,
        '--host',
        id
    ], {
        env: _.extend(process.env, { ANSIBLE_DEVOPS_SPACE: space })
    });
    
    var output = { stderr: '', stdout: ''}
    host.stderr.on('data', function(data) { output.stderr += data.toString(); });
    host.stdout.on('data', function(data) { output.stdout += data.toString(); });
    host.on('exit', function(code) {
        output.code = code;
        res.json(output);
    });
});

app.post('/run/:id', function(req, res, next) {
    var space = req.body.space;
    var id = req.params.id;
    
    if (!space) return next(new Error('missing space'));
    var run = spawn('ansible', [
        id,
        '-i',
        devops_py,
        '-m',
        'ping',
        '-vvv'
    ], {
        env: _.extend(process.env, { ANSIBLE_DEVOPS_SPACE: space })
    });
    
    var output = { stderr: '', stdout: ''}
    run.stderr.on('data', function(data) { output.stderr += data.toString(); });
    run.stdout.on('data', function(data) { output.stdout += data.toString(); });
    run.on('exit', function(code) {
        output.code = code;
        res.json(output);
    });
});

app.post('/link/:id', function(req, res, next) {
    var space = req.body.space;
    var id = req.params.id; 
    
    if (!space) return next(new Error('missing space'));
    var link = spawn('python', [
        devops_playbook_py,
        path.resolve(playbooksPath, 'linkServer.yml'),
        '-i',
        devops_py,
        '-u',
        'ubuntu',
        '-p',
        'ubuntu',
        '--limit',
        id,
        '--sudo',
        '-vvv'
    ], {
        env: _.extend(process.env, { ANSIBLE_DEVOPS_SPACE: space })
    });
    
    var output = { stderr: '', stdout: ''}
    link.stderr.on('data', function(data) { output.stderr += data.toString(); });
    link.stdout.on('data', function(data) { output.stdout += data.toString(); });
    link.on('exit', function(code) {
        output.code = code;
        res.json(output);
    });
});

app.post('/sync/:id', function(req, res, next) {
    var space = req.body.space;
    var id = req.params.id; 
    
    if (!space) return next(new Error('missing space'));
    var sync = spawn('ansible-playbook', [
        path.resolve(playbooksPath, 'sync.yml'),
        '-i',
        devops_py,
        '--limit',
        id,
        '--sudo',
        '-vvv'
    ], {
        env: _.extend(process.env, { ANSIBLE_DEVOPS_SPACE: space })
    });
    
    var output = { stderr: '', stdout: ''}
    sync.stderr.on('data', function(data) { output.stderr += data.toString(); });
    sync.stdout.on('data', function(data) { output.stdout += data.toString(); });
    sync.on('exit', function(code) {
        output.code = code;
        res.json(output);
    });
});

// Create servers
app.post('/server/:name', function(req, res, next) {
    var name = req.params.name;
    lxc.buildServer(name, function(err) {
        if (err) return next(err);
        res.send('Server '+ name +' created successfully: '+ lxc.servers[lxc.servers.length - 1].ip);
    })
})
app.del('/server/:name', function(req, res, next) {
    var name = req.params.name;
    lxc.destroyServer(name, function() {
        res.send('Server '+ name +' destroyed successfully.');
    })
})

console.log('Shit is on.');
app.listen(3000);

module.exports = app;
