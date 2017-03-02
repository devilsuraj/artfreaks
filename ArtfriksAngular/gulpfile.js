var gulp = require('gulp');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var builder = new Builder('', './src/systemjs.config.js');

var bundleHash = new Date().getTime();




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


gulp.task('bundle:app', function () {
    return builder
        .buildStatic('./src/main.js', './dist/' + mainBundleName)
        .catch(function (err) {
            console.log('App bundle error');
            console.log(err);
        });
});



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