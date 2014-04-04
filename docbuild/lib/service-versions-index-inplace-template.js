'use strict';

var fs = require('fs');
var path = require('path');
var marked = require('marked');
var gutil = require('gulp-util');
var through = require('through2');
var template = require('lodash').template;

module.exports = function (options) {
    var tempFile = options.template;
    var dataProperty = options.dataProperty || 'data';

    return through.obj(function (file, enc, cb) {
        if (!tempFile) {
            this.push(file);
            return cb();
        }

        var data = {};
        var versions = [];
        console.log(file.base);
        console.log(file.relative);
        var dirs = file.relative.split('/');
        var serviceDir = path.resolve(file.base, dirs[0]);
        console.log(serviceDir);

        if (fs.existsSync(serviceDir)) {
            versions = fs.readdirSync(serviceDir).map(function(v) {
                return v;
            });
        }

        data.service = dirs[0];
        data.versions = versions;
        console.log(data);

        console.log('!!!!!!!!!!!!!!!!!! ');
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
