'use strict';

var fs = require('fs');
var path = require('path');
var marked = require('marked');
var gutil = require('gulp-util');
var through = require('through2');
var template = require('lodash').template;

module.exports = function (options) {
    var pkgsDir = options.packages;
    var tempFile = options.template;
    var dataProperty = options.dataProperty || 'data';

    return through.obj(function (file, enc, cb) {
        if (!pkgsDir || !tempFile) {
            this.push(file);
            return cb();
        }

        //console.log(options);

        var data = {};
        data.packages = [];
        var packages = fs.readdirSync(pkgsDir);

        packages.forEach(function(p) {
            var tasks;
            var url = path.resolve(pkgsDir, p, 'v0.2/docs/tasks');

            if (fs.existsSync(url)) {
                tasks = fs.readdirSync(path.resolve(pkgsDir, p, 'v0.2/docs/tasks'));
            } else {
                tasks = [];
            }
            
            //
            tasks = tasks.map(function(t) {
                return t.split('.')[0];
            });

            //console.log(tasks);
            data.packages.push({configuration: p, tasks: tasks});
        });

        //console.log(data);
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-inplace-template', 'Streaming not supported'));
            return cb();
        }

        try {
            file.contents = new Buffer(template(fs.readFileSync(tempFile).toString(), data, options));
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-inplace-template', err));
        }

        this.push(file);
        cb();
    });
};
