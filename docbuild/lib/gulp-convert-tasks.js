var fs = require('fs');
var util = require('util');
var path = require('path');
var es = require('event-stream');
var gutil = require('gulp-util');
var through = require('through2');

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = function (options) {
  return es.map(function (file, callback) {
      var tasks = null;
      
      //console.log('=======================');
      //console.log(file);
      //console.log(file.base);
      //console.log(file.path);
      //console.log(file.stat);
      //console.log(file.relative);
      //console.log(file.inspect());
      //console.log(file.contents);
      //console.log('=======================');

       var dirs = file.relative.split('/');
       var taskName = dirs[3].split('.')[0];

       var taskTitle = util.format('# Task %s', capitaliseFirstLetter(taskName));
       var tasklabel = '';
       var taskYaml = '---\n{}\n---';

       var taskspath = path.join(file.base, dirs[0], dirs[1], 'tasks.json');

       if (fs.existsSync(taskspath)) tasks = require(taskspath);

       //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
       //console.log(taskspath);
       //console.log(tasks);
       //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

       if (!tasks) {
           file.contents = new Buffer(util.format('# Task %s\n\n---\n{}\n---', capitaliseFirstLetter(taskName)));
       } else {
           var taskObjs = tasks.filter(function(t) { 
               //console.log(t.id);
               return t.id === taskName
           });

           if (!taskObjs[0]) {
           file.contents = new Buffer(util.format('# Task %s\n\n---\n{}\n---', capitaliseFirstLetter(taskName)));
           } else {
               var taskObj = taskObjs[0];

               if (taskObj.label) {
                   //console.log('**********************************');
                   tasklabel = taskObj.label + '';
                   //console.log(tasklabel);
                   //console.log('**********************************');
               }
               if (taskObj.options && taskObj.options.length > 0) {
                   taskYaml = '---\n';
                   taskObj.options.forEach(function(o) {
                       var keys = Object.keys(o);
                       keys.forEach(function(k) {
                           if (k === keys[0]) {
                           taskYaml += ('- ' + k + ':  ' + o[k] + '\n');
                           } else {
                           taskYaml += ('  ' + k + ':  ' + o[k] + '\n');
                           }
                       });

                       taskYaml += '\n';
                   });
                   taskYaml += '---'
               }

               file.contents = new Buffer(taskTitle + '\n\n' + tasklabel + '\n\n' + taskYaml);
           }
       }

      callback(null, file);
  });
}
