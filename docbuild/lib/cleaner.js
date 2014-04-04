'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (options) {

    return through.obj(function (file, enc, cb) {
        file.contents = new Buffer(String(file.contents).replace(/^\s*\n/gm, ''));

        this.push(file);
        cb();
    });
};
