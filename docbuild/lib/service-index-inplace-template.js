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

    return through.obj(function (file, enc, cb) {
        if (!pkgsDir || !tempFile) {
            this.push(file);
            return cb();
        }

        var data = {};
        var services = [];
        var realDir = path.resolve(__dirname, '..', pkgsDir); 

        console.log(realDir);

        if (fs.existsSync(realDir)) {
            services = fs.readdirSync(realDir).map(function(s) {
                return s;
            });
        }

        data.services = services;
        console.log(data);

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
