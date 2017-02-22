var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var builder = new Builder('', './src/systemjs.config.js');

var bundleHash = new Date().getTime();
var mainBundleName = bundleHash + '.main.bundle.js';
var vendorBundleName = bundleHash + '.vendor.bundle.js';

// This is main task for production use
gulp.task('dist', function(done) {
    runSequence('clean', 'compile_ts', 'bundle', 'copy_assets', function() {
        done();
    });
});

var browserify = require('gulp-browserify');
 
// Basic usage 
gulp.task('browserify', function() {
    // Single entry point to browserify 
    gulp.src('dist2/app.js')
        .pipe(browserify({
         // insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('dist3'))
});

var gzip = require('gulp-gzip');

gulp.task('compress2', function() {
    gulp.src('./dist2/app.js')
    .pipe(gzip())
    .pipe(gulp.dest('./dist4'));
});

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
        gulp.src('app.js'),
        uglify(),
        gulp.dest('dist2')
    ],
    cb
  );
});

var Builder = require('systemjs-builder');
gulp.task('bundle2', function () {
    var builder = new Builder();

    //returns a promise
    return builder.loadConfig('./src/systemjs.config.js')
      .then(function () {
          // ready to build
          // returns a promise
          return builder.buildStatic('src/main', './app.js');
      });
});
gulp.task('bundle', ['bundle:vendor', 'bundle:app'], function () {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'app': mainBundleName,
            'vendor': vendorBundleName
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('bundle:vendor', function () {
    return builder
        .buildStatic('./src/vendor.js', './dist/' + vendorBundleName)
        .catch(function (err) {
            console.log('Vendor bundle error');
            console.log(err);
        });
});

gulp.task('bundle:app', function () {
    return builder
        .buildStatic('./src/main.js', './dist/' + mainBundleName)
        .catch(function (err) {
            console.log('App bundle error');
            console.log(err);
        });
});

gulp.task('compile_ts', shell.task([
    'tsc'
]));

gulp.task('copy_assets', function() {
     return gulp.src(['./assets/**/*'], {base:"."})
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', ['clean:ts', 'clean:dist']);

gulp.task('clean:dist', function () {
    return gulp.src(['./dist'], {read: false})
        .pipe(clean());
});

gulp.task('clean:ts', function () {
    return gulp.src(['./src/app/**/*.js', './src/app/**/*.js.map'], {read: false})
        .pipe(clean());
});