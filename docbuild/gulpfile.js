var path = require('path');
var http = require('http');

var ncp = require('ncp').ncp;
var openBrowser = require('open');
var connect = require('connect');
var Metalsmith = require('metalsmith');

var gulp = require('gulp');
var mkdirp = require('mkdirp');
var clean = require('gulp-clean');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var log = gutil.log;
var colors = gutil.colors;
var frontMatter = require('gulp-front-matter');
var rename = require('gulp-rename');
var marked = require('./lib/gulp-marked');
var cleaner = require('./lib/cleaner');
var siTemp = require('./lib/service-index-inplace-template');
var svTemp = require('./lib/service-versions-index-inplace-template');
var stiTemp = require('./lib/service-tasks-index-inplace-template');
var indexTemp = require('./lib/index-inplace-template');
var taskTemp = require('./lib/task-inplace-template');
var packageTemp = require('./lib/package-inplace-template');
var convert = require('./lib/gulp-convert');
var convertTasks = require('./lib/gulp-convert-tasks');

var site = require(path.resolve(__dirname, 'site.json'));
var siteJS = site.assets.vendor.js.concat(site.assets.custom.js);
var siteCSS = site.assets.vendor.css.concat(site.assets.custom.css);

gulp.task('index-doc', function() {
 gulp.src('./templates/index.html')
    .pipe(cleaner())
    .pipe(gulp.dest('../docs')) // you may want to take a look at gulp-marked at this point
});

gulp.task('services-index-doc', function() {
 gulp.src('./templates/sindex.html')
    .pipe(siTemp({
        packages: '../packages',
        template: './templates/sindex.html'
    }))
    .pipe(rename(function(fpath) {
        var dirs = fpath.dirname.split('/');
        console.log('###############');
        console.log(dirs);
        fpath.basename = 'index';
        fpath.extname = '.html';
        console.log('==========================');
        console.log(fpath);
        console.log('==========================');
    }))
    .pipe(cleaner())
    .pipe(gulp.dest('../docs/services/')) // you may want to take a look at gulp-marked at this point
});

gulp.task('service-versions-index-doc', function() {
 gulp.src('../packages/**/**/configuration.yml')
    .pipe(svTemp({
        packages: '../packages',
        template: './templates/svindex.html'
    }))
    .pipe(rename(function(fpath) {
        var dirs = fpath.dirname.split('/');
        console.log('###############');
        console.log(dirs);
        fpath.dirname = dirs[0];
        fpath.basename = 'index';
        fpath.extname = '.html';
        console.log('==========================');
        console.log(fpath);
        console.log('==========================');
    }))
    .pipe(cleaner())
    .pipe(gulp.dest('../docs/services/')) // you may want to take a look at gulp-marked at this point
}); 

gulp.task('service-index-doc', function() {
 gulp.src('../packages/*/*/docs/configuration.yml')
    .pipe(frontMatter({ // optional configuration
        property: 'configuration', // property added to file object
        remove: true // should we remove front-matter header?
    }))
    .pipe(marked())
    .pipe(packageTemp({template: './templates/package.html', dataProperty: 'configuration'}))
    .pipe(rename(function(fpath) {
        var dirs = fpath.dirname.split('/');
        console.log(dirs);
        fpath.dirname = path.join('services', dirs[0], dirs[1]);
        fpath.basename = "index";
        fpath.extname = ".html"
        //console.log('==========================');
        console.log(fpath);
       //console.log('==========================');
    }))
    .pipe(cleaner())
    .pipe(gulp.dest('../docs')) // you may want to take a look at gulp-marked at this point 
});

gulp.task('service-tasks-index-doc', function() {
 gulp.src('../packages/*/*/docs/configuration.yml')
    .pipe(stiTemp({
        template: './templates/stindex.html'
    }))
    .pipe(rename(function(fpath) {
        var dirs = fpath.dirname.split('/');
        fpath.basename = 'index';
        fpath.extname = '.html';
        fpath.dirname = path.join(dirs[0], dirs[1], 'tasks');
        console.log('==========================');
        console.log(fpath);
        console.log('==========================');
    }))
    .pipe(cleaner())
    .pipe(gulp.dest('../docs/services/')) // you may want to take a look at gulp-marked at this point
});

gulp.task('task-doc', function() {
    gulp.src('../packages/*/*/docs/tasks/*.yml')
    .pipe(frontMatter({ // optional configuration
        property: 'options', // property added to file object
        remove: true // should we remove front-matter header?
    }))
    .pipe(marked())
    .pipe(taskTemp({template: './templates/task.html', dataProperty: 'options'}))
    .pipe(rename(function(fpath) {
        var dirs = fpath.dirname.split('/');
        console.log(dirs);
        fpath.dirname = 'services/' + '/' + dirs[0] + '/' + dirs[1] + '/tasks';
        fpath.extname = ".html"
        //console.log('==========================');
        console.log(fpath);
        //console.log('==========================');
    }))
    .pipe(cleaner())
    .pipe(gulp.dest('../docs/')) // you may want to take a look at gulp-marked at this point
});

gulp.task('service-doc', function() {
    gulp.src('../packages/*/*/docs/configuration.yml')
    .pipe(frontMatter({ // optional configuration
        property: 'configuration', // property added to file object
        remove: true // should we remove front-matter header?
    }))
    .pipe(marked())
    .pipe(packageTemp({template: './templates/package.html', dataProperty: 'configuration'}))
    .pipe(rename(function(fpath) {
        var dirs = fpath.dirname.split('/');
        //console.log(dirs);
        fpath.dirname = path.join('services', dirs[0], dirs[1]);
        fpath.basename = "index";
        fpath.extname = ".html"
        //console.log('==========================');
        //console.log(fpath);
       //console.log('==========================');
    }))
    .pipe(cleaner())
    .pipe(gulp.dest('../docs')) // you may want to take a look at gulp-marked at this point
});

gulp.task('convert-tasks', function() {
    gulp.src('../backup/packages/**/tasks/*.yml')
        .pipe(convertTasks({}))
 .pipe(rename(function(fpath) {
 var dirs = fpath.dirname.split('/');
 dirs[2] = 'docs';
 dirs.push('tasks');

 fpath.dirname = dirs.join('/');
        //console.log('==========================');
        //console.log(fpath);
        //console.log('==========================');
    }))
//  .pipe(frontMatter({ // optional configuration
//          property: 'frontMatter', // property added to file object
//          remove: true // should we remove front-matter header?
//      }))
        .pipe(gulp.dest('../packages'))
});

gulp.task('convert-packages', function() {
    gulp.src('../backup/packages/**/*/variables.yml')
        .pipe(convert({}))
 .pipe(rename(function(fpath) {
        var dirs = fpath.dirname.split('/');
        dirs[2] = 'docs';
        fpath.dirname = dirs.join('/');
        fpath.basename = 'configuration'
        //console.log('==========================');
        //console.log(fpath);
        //console.log('==========================');
    }))
//  .pipe(frontMatter({ // optional configuration
//          property: 'frontMatter', // property added to file object
//          remove: true // should we remove front-matter header?
//      }))
        .pipe(gulp.dest('../packages'))
});


/*
 * Tasks
 */
gulp.task('prepare', function(callback) {
    mkdirp(site.destination, callback);
});

gulp.task('clean', function() {
    gulp.src(site.destination, {read: false})
        .pipe(clean());
})

gulp.task('sass', function() {
    gulp.src(site.assets.custom.scss)
        .pipe(sass({ compass: true }))
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('concat-js', function() {
    gulp.src(siteJS)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./public'));
});

gulp.task('concat-css', function() {
    gulp.src(siteCSS)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public'));
});


//
gulp.task('metalsmith', function(callback) {
    var metalsmith = new Metalsmith(process.cwd());

    metalsmith.source(site.source);
    metalsmith.destination(site.destination);
    metalsmith.metadata(site.metadata);

    Object.keys(site.plugins).forEach(function(key) {
        var plugin;
        var opts = site.plugins[key];

        plugin = require(key);

        metalsmith.use(plugin(opts));
    });

    metalsmith.build(function(err){
        if (err) return callback(err);
        callback();
    });
});

//
gulp.task('server', function(callback) {
    var devApp, devServer, devAddress, devHost, url;

    devApp = connect()
    .use(connect.logger('dev'))
    .use(connect.static('../docs'));

    // change port and hostname to something static if you prefer
    devServer = http.createServer(devApp).listen(gutil.env.port || 0 /*, hostname*/);

    devServer.on('error', function(error) {
        log(colors.underline(colors.red('ERROR'))+' Unable to start server!');
        callback(error); // we couldn't start the server, so report it and quit gulp
    });

    devServer.on('listening', function() {
        devAddress = devServer.address();
        devHost = devAddress.address === '0.0.0.0' ? 'localhost' : devAddress.address;
        url = ('http://' + devHost + ':' + devAddress.port);

        log('Started dev server at '+colors.magenta(url));
        if(gutil.env.open) {
            log('Opening dev server URL in browser');
            openBrowser(url);
        } else {
            log(colors.gray('(Run with --open to automatically open URL on startup)'));
        }
        log('Done');
        callback(); // we're done with this task for now
    });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(site.assets.custom.scss, ['sass']);
    gulp.watch(siteJS, ['concat-js']);
    gulp.watch(siteCSS, ['concat-css']);
    gulp.watch(['./public/**/*', './assets/**/*.{png}', './templates/**/*', './source/**/*'], ['metalsmith']);
});

gulp.task('default', ['index-doc', 'services-index-doc', 'service-versions-index-doc', 'service-index-doc', 'service-tasks-index-doc', 'service-doc', 'task-doc']);
gulp.task('development', ['index-doc', 'package-doc', 'task-doc', 'server']);
