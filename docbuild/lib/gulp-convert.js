var fs = require('fs');
var util = require('util');
var es = require('event-stream');
var gutil = require('gulp-util');
var through = require('through2');

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = function (options) {
  return es.map(function (file, callback) {
      
      console.log('=======================');
      console.log(file);
      console.log(file.base);
      console.log(file.path);
      console.log(file.stat);
      console.log(file.relative);
      console.log(file.inspect());
      console.log(file.contents);
      console.log('=======================');

      var dirs = file.relative.split('/');
      dirs[2] = 'docs'
      dirs[3] = 'configuration.yml'

      var md = util.format('# %s \n\n  Some text doc\n\n', capitaliseFirstLetter(dirs[0]));
      var content = String(file.contents);
      var tail = '\n\n---';

      file.contents = new Buffer(md + content + '\n\n---');

      callback(null, file);
  });
}
