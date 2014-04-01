'use strict';

var fs = require('fs');
var marked = require('marked');
var gutil = require('gulp-util');
var through = require('through2');
var template = require('lodash').template;

module.exports = function (options) {
    var tempFile = options.template;
    var dataProperty = options.dataProperty || 'data';

    return through.obj(function (file, enc, cb) {
        if (!tempFile || !file[dataProperty]) {
            this.push(file);
            return cb();
        }

        var data = {};
        data[dataProperty] = file[dataProperty];
        data.contents = String(file.contents);
        console.log(file.base);
        console.log(file.relative);
        var dirs = file.relative.split('/');
        data.package = dirs[0];
        data.task = dirs[4].split('.')[0];
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
